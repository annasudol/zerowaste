import { shallow } from 'enzyme';
import React from 'react';
import { Navigation } from './Navigation';
import toJson from 'enzyme-to-json';
import { renderHook } from '@testing-library/react-hooks';

jest.mock('../../hooks');
const useAuth = require('../../hooks').useAuth as jest.Mock;

describe('component', (): void => {
  describe('LoginSignUpForm', (): void => {
    it('match snapshot', (): void => {
      const wrapper = shallow(<Navigation />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    // it('zz', (): void => {
    //     const { result } = renderHook(() => useAuth());
    //     const wrapper = shallow(<Navigation/>);
    //     console.log(result)

    // })
    // it('match snapshot with prop signInPage true', (): void => {
    //     const wrapper = shallow(<LoginSignUpForm handleSubmit={jest.fn()} signInPage/>);

    //     expect(toJson(wrapper)).toMatchSnapshot();
    //   });
    //   it('displays error message', (): void => {
    //     const wrapper = shallow(<LoginSignUpForm handleSubmit={jest.fn()} errorMessage="test"/>);

    //     expect(wrapper.find('p').text()).toBe("test");
    //   });
    //  //TODO: finish test
    //   it('calls handleSubmit upon clicking submit button', (): void => {
    //     const mockHandleSubmit = jest.fn();
    //     const wrapper = shallow(<LoginSignUpForm handleSubmit={jest.fn()} />);
    //     wrapper.find(Form).simulate("onFinish");
    //     wrapper.find(Button).simulate('submit');
    //     wrapper.find(Button).at(0).simulate('click')
    //     expect(mockHandleSubmit).toHaveBeenCalledTimes(0);
    //   });
  });


});