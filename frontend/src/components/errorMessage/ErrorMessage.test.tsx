import { shallow } from 'enzyme';
import React from 'react';

import { ErrorMessage } from './ErrorMessage';
import toJson from 'enzyme-to-json';

describe('component', (): void => {
  describe('ErrorMessage', (): void => {
    it('match snapshot', (): void => {
      const wrapper = shallow(
        <ErrorMessage message="test"
        />,
      );

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders error message when given prop', (): void => {
      const wrapper = shallow(<ErrorMessage message="test" />);
      expect(wrapper.find('div h2').text()).toBe('test');
    });

    it('renders default error message when prop message was not given', (): void => {
      const wrapper = shallow(<ErrorMessage />);
      expect(wrapper.find('div h2').text()).toBe('Page not found');
    });
  });
});
