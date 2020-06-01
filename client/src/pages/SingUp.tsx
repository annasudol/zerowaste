import * as React from "react";
import { useForm } from "react-hook-form";
import { Auth } from "../components";
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router';
import { AppRoutes } from "../../routes";
import gql from 'graphql-tag';


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
  const [signUpUser, { loading, error }] = useMutation(SIGNUP_USER);

  const submit = (data: any) => {
    console.log(data)
    signUpUser({ variables: { name: data.name, email: data.email, password: data.password } });
    return history.push({ pathname: `${AppRoutes.Login}` });
  }

  return <Auth loading={loading} errorMessage={error && error.message} register={register} handleSubmit={handleSubmit} submit={submit} loginPage={false} />

}
