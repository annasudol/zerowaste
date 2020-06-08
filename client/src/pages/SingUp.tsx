import * as React from "react";
import { Auth, LoadingBar, RegisterInputs } from "../components";
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router';
import { AppRoutes } from "../../routes";
import gql from 'graphql-tag';
import { Redirect } from 'react-router';


export const SIGNUP_USER = gql`
  mutation SignUpUser($name: String!, $email: String!, $password: String!) {
    signUpUser(name: $name, email: $email, password: $password) {
        name
        email
    }
  }
`;



export const SignUp: React.FunctionComponent = (): React.ReactElement => {

  const [signUpUser, { data, loading, error }] = useMutation(SIGNUP_USER);

  const handleSubmit = (inputs: RegisterInputs) => {
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
