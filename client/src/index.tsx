import * as React from "react";
import { render } from "react-dom";
import { App } from "./components/App";

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import '../tailwind/tailwind.css';


const client = new ApolloClient({
  uri: 'http://localhost:4000/',
});



const rootEl = document.getElementById("root");

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootEl,
);
