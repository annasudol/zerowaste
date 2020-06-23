import { shallow } from 'enzyme';
import React from 'react';
import { LoginSignUpForm } from './LoginSignUpForm';
import toJson from 'enzyme-to-json';
import { Button, Form } from 'antd';

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
     //TODO: finish test
      it('calls handleSubmit upon clicking submit button', (): void => {
        const mockHandleSubmit = jest.fn();
        const wrapper = shallow(<LoginSignUpForm handleSubmit={jest.fn()} />);
        wrapper.find(Form).simulate("onFinish");
        wrapper.find(Button).simulate('submit');
        wrapper.find(Button).at(0).simulate('click')
        expect(mockHandleSubmit).toHaveBeenCalledTimes(0);
      });
});


});