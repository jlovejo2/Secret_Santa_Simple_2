import { ApolloServer } from 'apollo-server-micro';
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
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
// import resolvers from './resolvers';
import {
	GroupMutations,
	GroupQueries
} from '@lib/graphql/schema/group/resolvers';
import { UserMutations, UserQueries } from '@lib/graphql/schema/user/resolvers';
import { TodoMutations, TodoQueries } from '@lib/graphql/schema/todo/resolvers';

console.log('This is the server root', `${process.cwd()}`);

// used process.cwd() here instead of __dirname.  Made it easier for me to visualize the glob pattern to write
// process.cwd() returns the value of directory where we run the node process
// __dirname reutrns the value of the directory where the current running file resides
const loadedTypesFiles = loadFilesSync(
	join(process.cwd(), '@lib/graphql/schema/**/*.graphql')
);

// const loadedResolverFiles = loadFilesSync(
// 	join(process.cwd(), './src/graphql/**/resolvers/*.ts')
// );

const typeDefs = mergeTypeDefs(loadedTypesFiles);
const resolvers = mergeResolvers([
	GroupMutations,
	GroupQueries,
	UserMutations,
	UserQueries,
	TodoMutations,
	TodoQueries
]);

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
