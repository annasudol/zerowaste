import { shallow } from 'enzyme';
import React from 'react';
import { PrivateRoute, PublicRoute } from './ProtectedRoute';
import toJson from 'enzyme-to-json';
import { Login } from '../../pages';


describe('component', (): void => {
  describe('LoginSignUpForm', (): void => {
    describe('match snapshot', (): void=> {
        it('PrivateRoute', (): void => {
            const wrapper = shallow(<PrivateRoute component={Login} path="newPath" />);
            expect(toJson(wrapper)).toMatchSnapshot();
          });
          it('PublicRoute', (): void => {
            const wrapper = shallow(<PublicRoute component={Login} path="newPath" />);
            expect(toJson(wrapper)).toMatchSnapshot();
          });
    });
  });
});