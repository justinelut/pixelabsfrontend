import { ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URL+"/api/graphql",
});


const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: `account API-Key ${process.env.NEXT_PUBLIC_PAYLOAD_API_KEY}`,
        }
    }
});


export const serverClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});