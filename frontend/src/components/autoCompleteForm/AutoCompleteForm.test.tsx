import { mount, shallow } from 'enzyme';
import React from 'react';

import { AutoCompleteForm } from './AutoCompleteForm';
import Autocomplete from '@material-ui/lab/Autocomplete';
const list = ["test1", "test2", "test3"];

describe('component', (): void => {
  describe('AutoCompleteForm', (): void => {
    it('when prop list was not given renders empty array', (): void => {
      const wrapper = shallow(<AutoCompleteForm saveList={jest.fn()}/>);
      expect(wrapper.find(Autocomplete).prop('value')).toEqual([]);
    });

    it('when error prop is true has red border', (): void => {
      const wrapper = shallow(<AutoCompleteForm list={list} saveList={jest.fn()} error={true}/>);
      expect(wrapper.find(Autocomplete).prop('style')).toEqual({ border: '1px solid red' });
    });

    it('render placeholder props', (): void => {
        const wrapper = mount(<AutoCompleteForm list={list} saveList={jest.fn()} placeholder="example placeholder"/>);
        expect(wrapper.find('label').text()).toBe("example placeholder")
    });

    it('render default placeholder', (): void => {
        const wrapper = mount(<AutoCompleteForm list={list} saveList={jest.fn()} />);
        expect(wrapper.find('label').text()).toBe("Add at least one product")
    });

    it('responds to handleChange function', (): void => {
      const mockForm = jest.fn();
      const mockSaveList = jest.fn();
        const wrapper = shallow(<AutoCompleteForm list={list} saveList={mockSaveList} form={mockForm} placeholder="example placeholder"/>);
        wrapper.find(Autocomplete).simulate('change', ["apple"]);
        wrapper.update()
        expect(mockForm).toBeCalledTimes(1);
        expect(mockSaveList).toBeCalledTimes(1);
      });
  });
});
