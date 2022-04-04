import { ApolloServer } from 'apollo-server-micro';
import { fstat, readFileSync } from 'fs';
import 'graphql-import-node';
// import { schema } from '@graphql/index';
// import { join } from 'path';
// import { makeExecutableSchema } from '@graphql-tools/schema';
// import { loadFilesSync } from '@graphql-tools/load-files';
// import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
// import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import { tradeTokenForUser } from '@lib/auth/auth-helpers';
import { join } from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadFilesSync } from '@graphql-tools/load-files';
import { loadSchemaSync, loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
// import resolvers from './resolvers';
import { GroupMutations, GroupQueries } from './schema/group/resolvers';
import { UserMutations, UserQueries } from './schema/user/resolvers';
import { TodoMutations, TodoQueries } from './schema/todo/resolvers';

console.log(
	'This is the server root',
	`${process.cwd()}`,
	`${__dirname}`,
	join(__dirname, `schema/**/*.graphql`)
);

// used process.cwd() here instead of __dirname.  Made it easier for me to visualize the glob pattern to write
// process.cwd() returns the value of directory where we run the node process
// __dirname reutrns the value of the directory where the current running file resides
const loadedTypesFiles = loadFilesSync('**/*.graphql');

// const loadedTypesFiles = await loadSchema(`${__dirname}/schema/**/*.graphql`, {
// 	loaders: [
// 		new GraphQLFileLoader()
// 	]
// })

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

console.log('these are the merged resolvers: ', resolvers);

const schema = makeExecutableSchema({
	typeDefs: [DIRECTIVES, typeDefs],
	resolvers
});

// import resolvers from './resolvers';

// used process.cwd() here instead of __dirname.  Made it easier for me to visualize the glob pattern to write
// process.cwd() returns the value of directory where we run the node process
// __dirname reutrns the value of the directory where the current running file resides
// const loadedTypesFiles = loadFilesSync(
// 	join(process.cwd(), './src/graphql/**/*.graphql')
// );

// const loadedResolverFiles = loadFilesSync(
// 	join(process.cwd(), './src/graphql/**/resolvers/*.ts')
// );

// const typeDefs = mergeTypeDefs(loadedTypesFiles);
// const resolvers = mergeResolvers(loadedResolverFiles);

// const schema = makeExecutableSchema({
// 	typeDefs: [DIRECTIVES, typeDefs],
// 	resolvers,
// });

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
