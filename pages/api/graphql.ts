import { ApolloServer } from 'apollo-server-micro';
import 'graphql-import-node';
import { schema } from '../../src/graphql/schema';
import { join } from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
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

const apolloServer = new ApolloServer({
	schema,
	introspection: true,
	playground: true
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
