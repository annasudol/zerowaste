import * as React from "react";
import { LoadingBar, Auth, LoginInputs } from "../components";
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Redirect } from 'react-router';
import ApolloClient from 'apollo-client';
import { AppRoutes } from "../../routes";
import { AlertNewUser } from "../components/AlertNewUser";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
    }
  }
`;

const USER_CREATED_SUBSCRIPTION = gql`
  subscription userCreated {
    name
    email
  }
`;


export const Login: React.FunctionComponent = (): React.ReactElement => {

    const client: ApolloClient<any> = useApolloClient();

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



    const handleSubmit = (inputs: LoginInputs) => {
        login({ variables: { email: inputs.email, password: inputs.password } });
    }

    if (loading) {
        return <LoadingBar />
    }
    if (data) {
        return <Redirect to={AppRoutes.Home} />
    }
    return (
        <>
            <AlertNewUser />
            <Auth errorMessage={error && error.message} handleSubmit={handleSubmit} loginPage={true} />
        </>
    )
}
