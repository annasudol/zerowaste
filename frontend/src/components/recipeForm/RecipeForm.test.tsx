import { shallow } from 'enzyme';
import React from 'react';
import { RecipeForm } from './RecipeForm';
import toJson from 'enzyme-to-json';
import { sampleRecipe } from '../../assets/data/sampleRecipe'
import { Form } from 'antd';


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

    it('submit finish', ()=> {
        const wrapper = shallow(<RecipeForm handleSubmit={jest.fn()} initialValues={sampleRecipe} fillForm/>);
        wrapper.find('Button[type="dashed"]').simulate('click');
        wrapper.find('Button[htmlType="submit"]').simulate('click');

        // console.log(wrapper.debug())
    })

  });


});