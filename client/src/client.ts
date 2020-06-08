import {
    ApolloClient, ApolloLink, HttpLink, InMemoryCache, split
} from 'apollo-boost';
import { getAccessToken } from './utils/userAuth';
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from 'apollo-utilities'
const httpUrl = 'http://localhost:3005/graphql';
const uri = 'ws://localhost:3005/graphql';

const wslink = new WebSocketLink({
    uri, options: {
        connectionParams: {
            accessToken: getAccessToken()
        },
        lazy: true,
        reconnect: true,
    }
})
const httpLink = ApolloLink.from([
    new ApolloLink((operation, forward) => {
        const token = getAccessToken();
        if (token) {
            operation.setContext({ headers: { 'authorization': `Bearer ${token}` } });
        }
        return forward(operation);
    }),
    new HttpLink({ uri: httpUrl })
]);

function isSubscription(operation) {
    const definition = getMainDefinition(operation.query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
}

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: split(isSubscription, wslink, httpLink),
    defaultOptions: { query: { fetchPolicy: 'no-cache' } }
});

export default client;
