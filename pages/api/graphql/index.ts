import { ApolloServer, makeExecutableSchema } from 'apollo-server-micro';
import { fstat, readFileSync } from 'fs';
import 'graphql-import-node';
import { tradeTokenForUser } from '@src/auth/auth-helpers';
import { join, resolve } from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import {
	loadSchemaSync,
	loadSchema,
	loadTypedefsSync
} from '@graphql-tools/load';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import { printSchema } from 'graphql';
import {
	GroupMutations,
	GroupQueries
} from '@src/graphql/schema/group/resolvers';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { UserMutations, UserQueries } from '@src/graphql/schema/user/resolvers';
import { TodoMutations, TodoQueries } from '@src/graphql/schema/todo/resolvers';

console.log(
	'This is the server root',
	`${process.cwd()}`,
	`${__dirname}`,
	join(__dirname, `schema/**/*.graphql`)
);

// loaders: [new GraphQLFileLoader()]

const loadedTypesFiles = loadFilesSync(
	join(process.cwd(), `src/graphql/**/*.graphql`)
);

console.log('these are the loaded types files', loadedTypesFiles);

const typeDefs = mergeTypeDefs(loadedTypesFiles);

const resolvers = mergeResolvers([
	GroupMutations,
	GroupQueries,
	UserMutations,
	UserQueries,
	TodoMutations,
	TodoQueries
]);

const createSchema = () => {
	return makeExecutableSchema({
		typeDefs: [DIRECTIVES, typeDefs],
		resolvers
	});
};

const schema = createSchema();

console.log(printSchema(schema));

const HEADER_NAME = 'authorization';

const apolloServer = new ApolloServer({
	schema,
	introspection: true,
	playground: true,
	context: async ({ req }) => {
		let authToken = null;
		let currentUser = null;

		try {
			authToken = req.headers[HEADER_NAME];

			if (authToken) {
				currentUser = await tradeTokenForUser(authToken);
				console.log('current user: ', currentUser);
			}
		} catch (err) {
			console.error(`Couldn't authenticate using auth token: ${authToken}`);
		}

		return {
			authToken,
			currentUser
		};
	}
});

export const config = {
	api: {
		bodyParser: false
	}
};

async function start(req: any, res: any) {
	return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}

export default start;
