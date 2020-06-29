import { shallow } from 'enzyme';
import React from 'react';
import { ListInput } from './ListInput';
import toJson from 'enzyme-to-json';
import { Input, Button } from 'antd';


describe('component', (): void => {
  describe('ListInput', (): void => {
    it('match snapshot', (): void => {
      const wrapper = shallow(
        <ListInput detailedIngredients={[]} setDetailedIngredients={jest.fn()} form={jest.fn()} />,
      );

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('responds for handleIngredientsChange', () => {
        const mockSetDetailedIngredients = jest.fn()
        const wrapper = shallow(<ListInput form={jest.fn()} detailedIngredients={['test1']} setDetailedIngredients={mockSetDetailedIngredients} />);
        wrapper.find(Input).prop<Function>('onChange')({ target: { value: 'test2'}});
        wrapper.find(Button).simulate('click');
        expect(mockSetDetailedIngredients).toHaveBeenCalledWith(['test1', 'test2']);
      });
  });
});