import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components';
import 'antd/dist/antd.less';
import './styles/main.scss';

import { Provider } from 'react-redux';
import { store } from './state';
import { ApolloProvider } from '@apollo/react-hooks';
import { HashRouter } from 'react-router-dom';
import client from './graphql/client';
import { AuthProvider } from "./components";
import * as serviceWorker from './serviceWorker';

import dotenv from 'dotenv'
dotenv.config()

ReactDOM.render(

  <HashRouter>
    <ApolloProvider client={client}>
      <AuthProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </ApolloProvider>
  </HashRouter>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
