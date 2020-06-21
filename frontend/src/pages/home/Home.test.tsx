import { shallow } from 'enzyme';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Home } from './Home';
import toJson from 'enzyme-to-json';
import { act } from "react-dom/test-utils";

describe('component', (): void => {
  describe('Home', (): void => {
        it('match snapshot', (): void => {
        const wrapper = shallow(
            <Home />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
});
