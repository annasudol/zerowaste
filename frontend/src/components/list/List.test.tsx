import { shallow } from 'enzyme';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { List } from './List';
import toJson from 'enzyme-to-json';
const listProps = ["test1", "test2", "test3"];

const deleteItem = jest.fn();

describe('component', (): void => {
  describe('List', (): void => {
    it('match snapshot', (): void => {
      const wrapper = shallow(
        <List list={listProps} deleteItem={deleteItem}/>,
      );

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders list items from props', (): void => {
        const wrapper = shallow(
          <List list={listProps} deleteItem={jest.fn()}/>,
        );

        wrapper.find("span").map((item, index): void => {
            expect(item.text()).toBe(listProps[index]);
        })
    });

    it('deleteItem function was called upon clicking delete icon', (): void => {
        const wrapper = shallow(<List list={listProps} deleteItem={()=>deleteItem()}/>);

        wrapper.find(IconButton).at(0).simulate('click');

        expect(deleteItem).toHaveBeenCalledTimes(1);

    })
  });
});
