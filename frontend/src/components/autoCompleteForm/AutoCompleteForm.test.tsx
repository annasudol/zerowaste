import { mount, shallow } from 'enzyme';
import React from 'react';

import { AutoCompleteForm } from './AutoCompleteForm';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { renderReact } from "../../test.utils";

import { screen } from '@testing-library/react'
const list = ["test1", "test2", "test3"];

describe('component', (): void => {
  describe('AutoCompleteForm', (): void => {
    it('when prop list was not given does not display button', (): void => {
      renderReact(<AutoCompleteForm saveList={jest.fn()}/>);
      // expect(screen.getByRole('span')).toBeNull();
    });

    it('when error prop is true has red border', (): void => {
      const {container} = renderReact(<AutoCompleteForm list={list} saveList={jest.fn()} error />);
      expect(container.firstChild).toHaveStyle('border: 1px solid red');
    });

    it('renders list props', (): void => {
      renderReact(<AutoCompleteForm list={list} saveList={jest.fn()} />);
      list.map((listItem: string)=> expect(screen.getByText(listItem)).toBeInTheDocument());
    });

    it('render placeholder props', (): void => {
        renderReact(<AutoCompleteForm list={list} saveList={jest.fn()} placeholder="example placeholder"/>);
        expect(screen.getByText("example placeholder")).toBeInTheDocument();
    });

    it('render default placeholder', (): void => {
        renderReact(<AutoCompleteForm list={list} saveList={jest.fn()} />);
        expect(screen.getByText("Add at least one product")).toBeInTheDocument();

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
