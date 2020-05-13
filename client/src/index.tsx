import * as React from "react";
import { render } from "react-dom";
import App from "./components/App";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import { gql } from "apollo-boost";

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
});

client
    .query({
        query: gql`
      query GetLaunch {
        launch(id: 56) {
          id
          mission {
            name
          }
        }
      }
    `
    })
    .then(result => console.log(result));

const rootEl = document.getElementById("root");

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    rootEl,
);
