import { shallow } from 'enzyme';
import React from 'react';
import { Navigation } from './Navigation';
import toJson from 'enzyme-to-json';
import * as router from 'react-router';

// import { renderHook } from '@testing-library/react-hooks';

// require('../../hooks');
// const useAuth = require('../../hooks').useAuth as jest.Mock;

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
  });


});