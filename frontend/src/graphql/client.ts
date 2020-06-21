import {
    ApolloClient, ApolloLink, HttpLink, InMemoryCache, split
} from 'apollo-boost';
import { getAccessToken } from '../userAuth';
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from 'apollo-utilities'
import { onError } from "apollo-link-error";

const httpUrl = `http://localhost:${process.env.REACT_APP_PORT}/graphql`;
const uri = `ws://localhost:${process.env.REACT_APP_PORT}/subscriptions`;

const wslink = new WebSocketLink({
    uri, options: {
        connectionParams: {
            accessToken: getAccessToken()
        },
        lazy: true,
        reconnect: true
    }
})
const httpLink = ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new ApolloLink((operation, forward) => {
        const token = getAccessToken();
        if (token) {
            operation.setContext({ headers: { 'authorization': `Bearer ${token}` } });
        }
        return forward(operation);
    }),
    new HttpLink({ uri: httpUrl })
]);

function isSubscription(operation: { query: import("apollo-boost").DocumentNode; }) {
    const definition = getMainDefinition(operation.query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
}

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: split(isSubscription, wslink, httpLink),
    defaultOptions: { query: { fetchPolicy: 'no-cache' } }
});

export default client;
