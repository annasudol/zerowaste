import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components";
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useHistory } from 'react-router';
import ApolloClient from 'apollo-client';
import { AppRoutes } from "../../routes";
import { Main } from "../pages";
import { Route, Redirect } from "react-router-dom";
export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
    }
  }
`;

// export const SIGNUP_USER = gql`
//   mutation signup($input: {name: String!, email: String!, password: String!}) {
//     signup(input: $input) {
//         name
//         email
//         password
//     }
//   }
// `;
type Inputs = {
    example: string,
    exampleRequired: string,
};


// export interface LoginProps {
//     login: string;
//   }




export const Auth: React.FunctionComponent = (): React.ReactElement => {
    const history = useHistory();

    const client: ApolloClient<any> = useApolloClient();
    const { register, handleSubmit, watch, errors } = useForm<Inputs>();
    const [loginPage, setLoginPage] = React.useState(false);

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

    const toggleSetLoginPage = (): void => {
        setLoginPage(!loginPage);
    }

    const submit = (data: any) => {
        if (loginPage) {
            console.log(data)
            login({ variables: { email: data.email, password: data.password } });
            return history.push({ pathname: `${AppRoutes.Home}` });
            // return <Redirect to={{ pathname: `${AppRoutes.Home}` }} />
        }

    }

    return (
        <div className="content overflow-hidden flex justify-center items-center">
            <div className="form  flex flex-col">
                <h1 className="form-header font-bebas uppercase text-darkGray text-center pb-0 m-0">{loginPage ? 'Log in' : 'Create an account'}</h1>
                <p className="font-roboto text-center mb-4">{!loginPage ? 'Already have an account?' : "Don't have an account?"}</p>
                <Button onClick={toggleSetLoginPage} color="coral" className="mb-4">{!loginPage ? 'Switch to Log in' : 'Switch to Sign in'}</Button>
                <form onSubmit={handleSubmit(submit}>
                    {!loginPage && <input name="username" type="text" placeholder="User Name" ref={register({ required: true, maxLength: 30 })} />}
                    <input
                        name="email"
                        placeholder="Email"
                        type="email"
                        ref={register({
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "invalid email address"
                            }
                        })}
                    />
                    <input name="password" type="password" placeholder="Set a password" ref={register({ required: true })} />
                    <input type="submit" title="Submit" className="bg-green hover:bg-green text-white font-bold py-2 px-4 rounded outline-none m-1 border-0" />
                </form>
            </div>
        </div>)

}
