import { shallow, mount } from 'enzyme';
import React from 'react';
import { Navigation } from './Navigation';
import toJson from 'enzyme-to-json';
import { renderHook, act } from "@testing-library/react-hooks";
import { useAuth } from "../../hooks";
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history';

describe('component', (): void => {
  describe('LoginSignUpForm', (): void => {
    it('match snapshot', (): void => {
      const wrapper = shallow(<Navigation />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('responds for closing and opening navigation', (): void => {
      const wrapper = shallow(<Navigation />);
      expect(wrapper.children().at(1).hasClass('opened-nav')).toBe(true);
      expect(wrapper.children().at(1).hasClass('closed-nav')).toBe(false);

      // closing navigation
      wrapper.find('Button[type="link"]').simulate('click');
      expect(wrapper.children().at(1).hasClass('opened-nav')).toBe(false);
      expect(wrapper.children().at(1).hasClass('closed-nav')).toBe(true);

      // opening navigation
      wrapper.find('Button[shape="circle"]').simulate('click');
      expect(wrapper.children().at(1).hasClass('opened-nav')).toBe(true);
      expect(wrapper.children().at(1).hasClass('closed-nav')).toBe(false);

    });
    it('displays menu when user is logged in', ()=> {
      const { result } = renderHook(() => useAuth());
      act(() => {
        result.current.userLogged =true
      });

      const wrapper = shallow(<Navigation />);

      // eslint-disable-next-line array-callback-return
      ['Home', 'Add Recipe', 'Account'].map((title: string, index: number): void=> {
        expect(wrapper.find('Link').at(index).text()).toBe(title);
      });
    });

    it('logout user upon clicking logout button', ()=> {
      const history = createMemoryHistory()

      const { result } = renderHook(() => useAuth());
      act(() => {
        result.current.logoutUser = jest.fn();
        result.current.userLogged =true
      });
      const wrapper = mount(<Router history={history}><Navigation /></Router>);

      wrapper.find('Button').at(1).simulate('click');
      expect(result.current.logoutUser).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line array-callback-return
      ['Add Recipe', 'Account'].map((title: string, index: number): void=> {
        expect(wrapper.find('Link').at(index).text()).not.toBe(title);
      });

    })
  });
});