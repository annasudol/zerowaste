import * as React from "react";
import { useForm } from "react-hook-form";
import { Auth, LoadingBar } from "../components";
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

type Inputs = {
  name: string
  email: string
  password: string
};



export const SignUp: React.FunctionComponent = (): React.ReactElement => {
  const history = useHistory();

  const { register, handleSubmit, watch, errors } = useForm<Inputs>();
  const [signUpUser, { data, loading, error }] = useMutation(SIGNUP_USER);

  const submit = (user: { name: string, email: string, password: string }) => {
    signUpUser({ variables: { name: user.name, email: user.email, password: user.password } });
  }

  if (loading) {
    return <LoadingBar />
  }
  if (data) {
    return <Redirect to={AppRoutes.Login} />
  }

  return <Auth errorMessage={error && error.message} register={register} handleSubmit={handleSubmit} submit={submit} loginPage={false} />

}
