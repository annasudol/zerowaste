import { shallow } from 'enzyme';
import React from 'react';
import { LoadingBar } from './LoadingBar';
import toJson from 'enzyme-to-json';

describe('component', (): void => {
  describe('LoadingBar', (): void => {
    it('match snapshot', (): void => {
      const wrapper = shallow(
        <LoadingBar />,
      );

      expect(toJson(wrapper)).toMatchSnapshot();
    });
});


});