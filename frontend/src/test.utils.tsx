import React from 'react';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from './state';

export * from '@testing-library/react';
type RenderApolloOptions = { 
  mocks?: MockedResponse[], 
  addTypename?: any, 
  defaultOptions?: any, 
  cache?: any, 
  resolvers?: any,
  [st: string]: any;
}

const renderApollo = (node: any, { mocks, addTypename, defaultOptions, cache, resolvers, ...options }: RenderApolloOptions = {}) => {

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
  });

  return render(
    <MockedProvider
      mocks={mocks}
      addTypename={addTypename}
      defaultOptions={defaultOptions}
      cache={cache}
      resolvers={resolvers}
    >
      {node}
    </MockedProvider>,
    options,
  );
};






const renderReact = (node: any) => {

const history = createMemoryHistory()
return render(
  <Provider store={store}>
    <Router history={history}>
      {node}
    </Router>
    </Provider>,
  );
};


export { renderApollo, renderReact };
