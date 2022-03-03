import {
	ApolloProvider,
	ApolloClient,
	HttpLink,
	InMemoryCache,
	createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'node-fetch'; // Use node-fetch here to allow SSR
import '../styles/globals.css';

const httpLink = createHttpLink({
	uri: '/api/graphql',
	fetch: fetch as any
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('auth-token');

	return {
		headers: {
			...headers,
			authorization: token ? `${token}` : 'not-authorized'
		}
	};
});

const client = new ApolloClient({
	// link: new HttpLink({ uri: "/api/graphql", fetch: fetch as any }),
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});

// This default export is required
export default function App({ Component, pageProps }) {
	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	);
}
