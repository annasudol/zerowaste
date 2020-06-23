import { shallow } from 'enzyme';
import React from 'react';

import { App } from './App';
import toJson from 'enzyme-to-json';

describe('component', (): void => {
  describe('App', (): void => {
    it('match snapshot', (): void => {
      const wrapper = shallow(<App/>,);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
