import * as React from "react";
import { render } from "react-dom";
import { App } from "./components/App";
import '../tailwind/tailwind.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state';


import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
const token = localStorage.getItem('token')
import { HashRouter } from 'react-router-dom'

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const cache = new InMemoryCache();
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:3004/graphql',
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    },
  }),
  connectToDevTools: true
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
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
