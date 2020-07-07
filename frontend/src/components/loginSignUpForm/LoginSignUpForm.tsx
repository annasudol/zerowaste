import React, { FC, ReactElement } from 'react';
import { Form, Input, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';

interface AuthProps {
  errorMessage?: string
  handleSubmit(inputValues: Store): void
  signInPage?: boolean
}

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const LoginSignUpForm: FC<AuthProps> = ({ errorMessage, handleSubmit, signInPage = false }): ReactElement => {
  const onFinish = (inputValues: Store) => handleSubmit(inputValues);
  return (
    <div className='content overflow-hidden flex justify-center items-center'>
      <div className='flex flex-col'>
        <h1 className='form-header font-bebas uppercase text-darkGray text-center pb-0 m-0'>{!signInPage ? 'Log in' : 'Sign Up'}</h1>
        {errorMessage && <p className='text-coral text-sm text-center mb-3'>{errorMessage}</p>}
        <Form
          {...layout}
          name='basic'
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {signInPage && (
            <Form.Item
              label='Username'
              name='name'
              rules={[{ required: true, type: 'string', min: 5, message: 'Please input your username!' }]}>
              <Input data-testid="name-input"/>
            </Form.Item>
          )}
          <Form.Item
            label='Email'

            name='email'
            rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
          >
            <Input data-testid="email-input"/>
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password data-testid="password-input"/>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>)
}
