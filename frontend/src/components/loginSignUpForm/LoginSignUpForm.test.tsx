import { shallow } from 'enzyme';
import React from 'react';
import { LoginSignUpForm } from './LoginSignUpForm';
import toJson from 'enzyme-to-json';
import { Button, Form } from 'antd';
import { Store } from 'antd/lib/form/interface';
describe('component', (): void => {
  describe('LoginSignUpForm', (): void => {
    it('match snapshot', (): void => {
      const wrapper = shallow(<LoginSignUpForm handleSubmit={jest.fn()}/>);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('match snapshot with prop signInPage true', (): void => {
        const wrapper = shallow(<LoginSignUpForm handleSubmit={jest.fn()} signInPage/>);

        expect(toJson(wrapper)).toMatchSnapshot();
      });
      it('displays error message', (): void => {
        const wrapper = shallow(<LoginSignUpForm handleSubmit={jest.fn()} errorMessage="test"/>);

        expect(wrapper.find('p').text()).toBe("test");
      });
      it('calls handleSubmit upon clicking submit button', (): void => {
        const mockHandleSubmit = jest.fn();
        const wrapper = shallow(<LoginSignUpForm handleSubmit={mockHandleSubmit} />);
        wrapper.find(Form).prop<Function>('onFinish')({email: "example@email.com", password: "Pas321!"});
        wrapper.find(Button).simulate('submit', {email: "example@email.com", password: "Pas321!"}); 
        wrapper.find(Button).at(0).simulate('click');

        expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
      });
});


});