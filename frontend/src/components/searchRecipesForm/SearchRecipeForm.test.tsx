import React from 'react';
import { shallow } from 'enzyme';
import { SearchRecipesForm, AutoCompleteForm } from '../../components';
import toJson from 'enzyme-to-json';
import * as redux from 'react-redux';
import { Button } from 'antd';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
    useDispatch: (): jest.Mock<any, any> => mockDispatch,
    useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));


jest.mock('react-redux', () => ({
    useDispatch: (): jest.Mock<any, any> => mockDispatch,
    useSelector: jest.fn(),
}));


describe('component', (): void => {
    describe('SearchRecipesForm', (): void => {
      it('renders component when getProducts is undefined', (): void => {
        const wrapper = shallow(<SearchRecipesForm />);
        expect(toJson(wrapper)).toMatchSnapshot();
      });

      it('renders component when getProducts is given', (): void => {
        const spy = jest.spyOn(redux, 'useSelector');

        spy.mockReturnValue({getProducts: ["apple", "sugar"]});
        });
        const wrapper = shallow(<SearchRecipesForm />);
        expect(toJson(wrapper)).toMatchSnapshot();
      });
      it('calls dispatch function after clicking the button', (): void => {
        const spy = jest.spyOn(redux, 'useSelector');

        spy.mockReturnValue({getProducts: ["apple", "sugar"]});

        const wrapper = shallow(<SearchRecipesForm />);
        wrapper.find(AutoCompleteForm).prop('saveList')(['apple']);
        wrapper.find(Button).simulate('click');
        expect(mockDispatch).toHaveBeenCalledTimes(1);


    });
  });
  