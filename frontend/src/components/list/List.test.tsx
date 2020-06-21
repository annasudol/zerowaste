import { shallow } from 'enzyme';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { List } from './List';
import toJson from 'enzyme-to-json';
import { act } from "react-dom/test-utils";
const listProps = ["test1", "test2", "test3"];

const deleteMock = jest.fn();
describe('component', (): void => {
  describe('List', (): void => {
    it('match snapshot', (): void => {
      const wrapper = shallow(
        <List list={listProps} deleteItem={deleteMock}/>,
      );

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders list items from props', (): void => {
        const wrapper = shallow(
          <List list={listProps} deleteItem={jest.fn()}/>,
        );

        wrapper.find("span").map((item, index)=> {
            expect(item.text()).toBe(listProps[index]);
        })
    });

    it('delete item upon clicking delete icon', (): void => {
        const wrapper = shallow(
          <List list={listProps} deleteItem={jest.fn()}/>,
        );
        act(() => {
            wrapper.find(DeleteIcon).at(0).simulate('click');

        })
        expect(wrapper.update().find("span")).toHaveLength(2);

    })
  });
});
