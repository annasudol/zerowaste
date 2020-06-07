import * as React from "react";
import { render } from "react-dom";
import { App } from "./components/App";
import 'antd/dist/antd.less';
import '../styles/main.scss'
import { Provider } from 'react-redux';
import { store } from './state';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { HashRouter } from 'react-router-dom'
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
const token = localStorage.getItem('token')

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          // tslint:disable-next-line: no-console
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      // tslint:disable-next-line: no-console
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: 'http://localhost:3004/graphql',
      credentials: 'same-origin',
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      },
    })
  ]),

  cache: new InMemoryCache()
});

const rootEl = document.getElementById("root");

render(
  <HashRouter>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </HashRouter>,
  rootEl,
);
