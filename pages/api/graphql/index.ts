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
import groupSchema from '@src/graphql/schema/group/types/schema.graphql';
import groupMutation from '@src/graphql/schema/group/types/mutation.graphql';
import groupQuery from '@src/graphql/schema/group/types/query.graphql';
import userSchema from '@src/graphql/schema/user/types/schema.graphql';
import userMutation from '@src/graphql/schema/user/types/mutation.graphql';
import userQuery from '@src/graphql/schema/user/types/query.graphql';
import todoSchema from '@src/graphql/schema/todo/types/schema.graphql';
import todoMutation from '@src/graphql/schema/todo/types/mutation.graphql';
import todoQuery from '@src/graphql/schema/todo/types/query.graphql';

// Could not use loadFilesSync because Vercel does not know to include the .graphql files in build process.  Have to import them in so that webpack can use graphql-loader to compile them for vercel to build
// const loadedTypesFiles = loadFilesSync(
// 	join(process.cwd(), `src/graphql/**/*.graphql`)
// );

const typeDefs = mergeTypeDefs([
	groupSchema,
	groupMutation,
	groupQuery,
	userSchema,
	userMutation,
	userQuery,
	todoSchema,
	todoMutation,
	todoQuery
]);

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
