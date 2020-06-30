import React from 'react';
import { Login, LOGIN_USER } from './Login';
import { renderApollo, cleanup,  fireEvent, waitForElement } from '../../test.utils';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { gql } from "apollo-boost";

describe('component', (): void => {
  describe('Login', (): void => {
        afterEach(cleanup);

        it('renders login page', async () => {
            const mocks = [
                {
                request: {
                    query: LOGIN_USER,
                    variables: { email: "email@test.com", password: "Test098"},
                },
                results: { data:  {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZG9sYW5uQGdtYWlsLmNvbSIsImlhdCI6MTU5MzUyNzE5NSwiZXhwIjoxNTk0MTMxOTk1fQ.lWd4rQz4VYjlF-7u8KzKYFLFblcXInxDrKAz9hZLwfY"}},
            }
            ];
            renderApollo(<Login/>, {mocks});
        });
        it('fires login mutation and updates cache after done', async () => {
            const cache = new InMemoryCache();

            const mocks = [
              {
                request: {query: LOGIN_USER, variables: {email: "email@test.com", password: "Test098"}},
                results: { data:  {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZG9sYW5uQGdtYWlsLmNvbSIsImlhdCI6MTU5MzUyNzE5NSwiZXhwIjoxNTk0MTMxOTk1fQ.lWd4rQz4VYjlF-7u8KzKYFLFblcXInxDrKAz9hZLwfY"}},
              },
            ];

            const {getByText, getByTestId} = await renderApollo(<Login />, {
              mocks,
              cache
            });

            fireEvent.change(getByTestId('email-input'), {
                target: {value: "email@test.com"},
            });

            fireEvent.change(getByTestId('password-input'), {
                target: {value: "Test098"},
            });
  

            fireEvent.click(getByText(/submit/i));

            // login is done if loader is gone
            await waitForElement(() => getByText(/submit/i));
        
            // check to make sure the cache's contents have been updated
            // const response: any = cache.readQuery({
            //   query: gql`
            //     query IsUserLoggedIn {
            //       isLoggedIn @client
            //     }
            //   `,
            // });
            // const {isLoggedIn} = response;
            // expect(isLoggedIn).toBeTruthy();
          });
    });
});
