import { shallow } from 'enzyme';
import React from 'react';
import { Home } from './Home';
import toJson from 'enzyme-to-json';

describe('component', (): void => {
  describe('Home', (): void => {
        it('match snapshot', (): void => {
        const wrapper = shallow(<Home />);

        expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
});
