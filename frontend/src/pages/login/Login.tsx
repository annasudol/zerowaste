import React, { FC, ReactElement } from 'react';

import { LoadingBar, LoginSignUpForm, useAuth } from '../../components';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Redirect } from 'react-router';
import { AppRoutes } from '../../routes';
import { Store } from 'antd/lib/form/interface';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
    }
  }
`;


export const Login: FC= (): ReactElement => {
  const { rememberLogin } = useAuth();
  const [login, { data, loading, error }] = useMutation(
    LOGIN_USER,
    {
      onError(err) {
        console.log(err);
      },
      onCompleted({ login }) {
        rememberLogin(login.token);
      }
    }
  );



  const handleSubmit = (inputs: Store) => {
    login({ variables: { email: inputs.email, password: inputs.password } });
  }

  if (loading) {
    return <LoadingBar />
  }
  if (data) {
    return <Redirect to={AppRoutes.Home} />
  }
  return <LoginSignUpForm errorMessage={error && error.message} handleSubmit={handleSubmit} loginPage={true} />
}
