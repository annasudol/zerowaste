import { shallow } from 'enzyme';
import React from 'react';
import { RecipeForm } from './RecipeForm';
import toJson from 'enzyme-to-json';
import { sampleRecipe } from '../../assets/data/sampleRecipe'


describe('component', (): void => {
  describe('LoginSignUpForm', (): void => {
    it('match snapshot', (): void => {
      const wrapper = shallow(<RecipeForm handleSubmit={jest.fn()}/>);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('match snapshot when initialValues props are given', ()=> {
        const wrapper = shallow(<RecipeForm handleSubmit={jest.fn()} initialValues={sampleRecipe}/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    })

  });


});