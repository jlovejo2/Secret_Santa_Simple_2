import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../src/graphql/schema';

const apolloServer = new ApolloServer({
	schema
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
