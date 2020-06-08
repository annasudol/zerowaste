import * as React from "react";
import { Form, Input, Button } from 'antd';
import { AlertNewUser } from "./AlertNewUser";

import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';


// const NEW_USER_SUBSCRIPTION = gql`
//   subscription userCreated {
//     userCreated {
//         name
//         email
//     }
//   }
// `;

// const messagesAddedSubscription = gql`
//   subscription {
//     messageAdded {
//     id
//     text
//   }
//   }
// `;

// export function onMessageAdded(handleMessage) {
//   const observable = subscribe({ query: messagesAddedSubscription });
//   observable.subscribe(({ data }) => handleMessage(data.messageAdded));
// }

export interface LoginInputs {
    email: string
    password: string
}

export interface RegisterInputs extends LoginInputs {
    name: string
}

interface AuthProps {
    errorMessage?: string
    handleSubmit(inputValues: LoginInputs): void
    loginPage?: boolean
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export const Auth: React.FunctionComponent<AuthProps> = ({ errorMessage, handleSubmit, loginPage = true }): React.ReactElement => {
    const onFinish = (inputValues) => {
        handleSubmit(inputValues)
    };
    // const { data, error } = useSubscription(NEW_USER_SUBSCRIPTION);
    return (
        <div className="content overflow-hidden flex justify-center items-center">
            <div className="form  flex flex-col">

                <h1 className="form-header font-bebas uppercase text-darkGray text-center pb-0 m-0">{loginPage ? 'Log in' : 'Sign Up'}</h1>
                {errorMessage && <p className="text-coral text-sm text-center mb-3">{errorMessage}</p>}
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    {!loginPage && (
                        <Form.Item
                            label="Username"
                            name="name"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                    )}
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>)
}
