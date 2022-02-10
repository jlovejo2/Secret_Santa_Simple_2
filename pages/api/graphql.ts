import { ApolloServer, makeExecutableSchema } from 'apollo-server-micro';
// import "graphql-import-node";
import { DocumentNode } from 'graphql';
import { importSchema } from 'graphql-import';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
// import typeDefs from "../../src/graphql/schema.graphql";
import { addResolversToSchema } from '@graphql-tools/schema';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import resolvers from '../../src/graphql/resolvers';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';

// const typeDefs = importSchema('./src/graphql/schema/**/*.graphql')

// console.log(typeDefs)

// const schema = makeExecutableSchema({ typeDefs: [DIRECTIVES, typeDefs],
//   resolvers})

const schema = await loadSchema('../../src/graphql/schema/**/*.graphql', {
	loaders: [new GraphQLFileLoader()]
});

const schemaWithResolvers = addResolversToSchema({
	schema,
	resolvers
});

const apolloServer = new ApolloServer({
	schema: schemaWithResolvers
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
