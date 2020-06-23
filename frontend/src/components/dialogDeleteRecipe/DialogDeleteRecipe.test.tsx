import { shallow } from 'enzyme';
import React from 'react';

import { DialogDeleteRecipe } from './DialogDeleteRecipe';
import toJson from 'enzyme-to-json';

describe('component', (): void => {
  describe('ErrorMessage', (): void => {
    it('match snapshot', (): void => {
        const wrapper = shallow(<DialogDeleteRecipe open toggleOpen={jest.fn()} recipeId="" title="dialog title" image="myImage" />);

        expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
