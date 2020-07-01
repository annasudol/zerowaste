import { shallow } from 'enzyme';
import React from 'react';
import { RecipeForm } from './RecipeForm';
import toJson from 'enzyme-to-json';
import { sampleRecipe } from '../../assets/data/sampleRecipe'
import { Form } from 'antd';
import { AutoCompleteForm, List, ListInput, ImageUpload, formRef } from '../../components';

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

    it('submit finish without error', ()=> {
        const wrapper = shallow(<RecipeForm handleSubmit={jest.fn()} initialValues={sampleRecipe} fillForm />);
        wrapper.find('Button[type="dashed"]').simulate('click');
        wrapper.find(Form).prop<Function>('onFinish')({values: sampleRecipe});
        wrapper.find('Button[htmlType="submit"]').simulate('click');
    });

      it('fill inputs without error', (): void=> {
        const wrapper = shallow(<RecipeForm handleSubmit={jest.fn()} />);

        const blob = new Blob([JSON.stringify({
          lastModified: 1592474852973,
          name: "16800-blue-ribbon-apple-pie-600x600.jpg",
          size: 128209,
          type: "image/jpeg",
          uid: "rc-upload-1593444261913-2",
          webkitRelativePath: "",
        })], {type : 'text/html'})

        wrapper.find(ImageUpload).prop<Function>('form')(formRef.current?.setFieldsValue({ image: blob }));
        wrapper.find(ListInput).prop<Function>('setDetailedIngredients')(['test']);
        wrapper.find(AutoCompleteForm).prop<Function>('saveList')(['test1']);
        wrapper.find(AutoCompleteForm).prop<Function>('form')(formRef.current?.setFieldsValue({ ingredients: ['test1'] }));
        wrapper.find('Button[htmlType="submit"]').simulate('click');
      });

      it('reset form without error', (): void=> {
        const wrapper = shallow(<RecipeForm handleSubmit={jest.fn()} />);
        wrapper.find('Button[htmlType="button"]').simulate('click');
      });

      it('render with onFinishFailed', (): void=> {
        const wrapper = shallow(<RecipeForm handleSubmit={jest.fn()} />);
        wrapper.find(Form).prop<Function>('onFinishFailed')({errorInfo: { errorFields: [{ errors: ['error'], title: ['error'] }] } });
        wrapper.find('Button[htmlType="button"]').simulate('click');
      });

     describe('responds for changes in detailed ingredients', (): void=> {
      const setState = jest.fn();

      beforeEach(()=>{
        const useStateSpy = jest.spyOn(React, 'useState')
        useStateSpy.mockImplementation((init) => [init, setState]);
       })
      it('adding detailedIngredients', (): void=> {
        const wrapper = shallow(<RecipeForm handleSubmit={jest.fn()} />);
        wrapper.find(ListInput).prop<Function>('setDetailedIngredients')(['test1', 'test2', 'test3']);
        expect(setState).toHaveBeenCalledWith(['test1', 'test2', 'test3']);
      });

      it('deleting detailedIngredients', (): void=> {
        const wrapper = shallow(<RecipeForm handleSubmit={jest.fn()} initialValues={sampleRecipe} />);
        wrapper.find(List).prop<Function>('deleteItem')('1/2 cup sugar');

      });
     })
  });
});