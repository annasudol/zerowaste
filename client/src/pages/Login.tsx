import * as React from "react";
import { useForm } from "react-hook-form";
import { Button, LoadingBar, ErrorMessage, Auth } from "../components";
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useHistory } from 'react-router';
import ApolloClient from 'apollo-client';
import { AppRoutes } from "../../routes";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
    }
  }
`;


type Inputs = {
    email: string
    password: string
}


export const Login: React.FunctionComponent = (): React.ReactElement => {
    const history = useHistory();

    const client: ApolloClient<any> = useApolloClient();
    const { register, handleSubmit, watch, errors } = useForm<Inputs>();

    const [login, { loading, error }] = useMutation(
        LOGIN_USER,
        {
            // tslint:disable-next-line: no-shadowed-variable
            onCompleted({ login }) {
                localStorage.setItem('token', login.token);
                client.writeData({ data: { isLoggedIn: true } });
            }
        }
    );



    const submit = (data: any) => {
        login({ variables: { email: data.email, password: data.password } });
        return history.push({ pathname: `${AppRoutes.Home}` });
    }

    return (
        <Auth loading={loading} errorMessage={error && error.message} register={register} handleSubmit={handleSubmit} submit={submit} loginPage={true} />
    )
}
