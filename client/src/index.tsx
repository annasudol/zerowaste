import * as React from 'react';
import { render } from 'react-dom';
import { App } from './components';
import 'antd/dist/antd.less';
import '../styles/main.scss'
import { Provider } from 'react-redux';
import { store } from './state';
import { ApolloProvider } from '@apollo/react-hooks';
import { HashRouter } from 'react-router-dom'
import client from './graphql/client';
import { AuthProvider } from "./components"

const rootEl = document.getElementById('root');

render(
  <HashRouter>
    <ApolloProvider client={client}>
      <AuthProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </ApolloProvider>
  </HashRouter>,
  rootEl,
);
