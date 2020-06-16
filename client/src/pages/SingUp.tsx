import * as React from 'react';
import { Auth, LoadingBar } from '../components';
import { useMutation } from '@apollo/react-hooks';
import { AppRoutes } from '../../routes';
import gql from 'graphql-tag';
import { Redirect } from 'react-router';
import { Store } from 'antd/lib/form/interface';


export const SIGNUP_USER = gql`
  mutation SignUpUser($name: String!, $email: String!, $password: String!) {
    signUpUser(name: $name, email: $email, password: $password) {
        name
        email
    }
  }
`;



export const SignUp: React.FC = (): React.ReactElement => {

  const [signUpUser, { data, loading, error }] = useMutation(SIGNUP_USER);

  const handleSubmit = (inputs: Store) => {
    signUpUser({ variables: { name: inputs.name, email: inputs.email, password: inputs.password } });
  }


  if (loading) {
    return <LoadingBar />
  }
  if (data) {
    return <Redirect to={AppRoutes.Login} />
  }

  return <Auth errorMessage={error && error.message} handleSubmit={handleSubmit} loginPage={false} />

}
