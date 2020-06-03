import * as React from "react";
import { useForm } from "react-hook-form";
import { LoadingBar, Auth } from "../components";
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Redirect } from 'react-router';
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

    const client: ApolloClient<any> = useApolloClient();
    const { register, handleSubmit, watch, errors } = useForm<Inputs>();

    const [login, { data, loading, error }] = useMutation(
        LOGIN_USER,
        {
            // tslint:disable-next-line: no-shadowed-variable
            onCompleted({ login }) {
                localStorage.setItem('token', login.token);
                client.writeData({ data: { isLoggedIn: true } });
                window.location.reload(false)
            }
        }
    );



    const submit = (inputs: any) => {
        login({ variables: { email: inputs.email, password: inputs.password } });
    }

    if (loading) {
        return <LoadingBar />
    }
    if (data) {
        return <Redirect to={AppRoutes.Home} />
    }
    return (
        <Auth errorMessage={error && error.message} register={register} handleSubmit={handleSubmit} submit={submit} loginPage={true} />
    )
}
