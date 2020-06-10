import * as React from "react";
import { Auth, LoadingBar, RegisterInputs } from "../components";
import { useMutation } from '@apollo/react-hooks';
import { AppRoutes } from "../../routes";
import gql from 'graphql-tag';
import { Redirect } from 'react-router';
// import { onUserAdded } from "../graphql/graphql";


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
  React.useEffect(() => {
    if (data) {
      // onUserAdded(data);
    }
  }, [data])

  if (loading) {
    return <LoadingBar />
  }
  if (data) {
    return <Redirect to={AppRoutes.Login} />
  }

  return <Auth errorMessage={error && error.message} handleSubmit={handleSubmit} loginPage={false} />

}
