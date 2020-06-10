import * as React from 'react';
import { LoadingBar, Auth } from '../components';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Redirect } from 'react-router';
import { AppRoutes } from '../../routes';
import { AlertNewUser } from '../components/AlertNewUser';
import { rememberLogin } from '../userAuth';
import { Store } from 'antd/lib/form/interface';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
    }
  }
`;

export const Login: React.FunctionComponent = (): React.ReactElement => {


  const [login, { data, loading, error }] = useMutation(
    LOGIN_USER,
    {
      onCompleted({ login }) {
        rememberLogin(login.token)
        window.location.reload(false)
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
  return (
    <><AlertNewUser />
      <Auth errorMessage={error && error.message} handleSubmit={handleSubmit} loginPage={true} />
    </>
  )
}
