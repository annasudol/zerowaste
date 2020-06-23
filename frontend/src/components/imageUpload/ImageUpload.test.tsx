import { mount } from 'enzyme';
import React from 'react';

import toJson from 'enzyme-to-json';
import { ImageUpload } from './ImageUpload';

describe('component', (): void => {
  describe('ImageUpload', (): void => {
    it('match snapshot', (): void => {
      const image = mount(<ImageUpload />);
    //   expect(toJson(image)).toMatchSnapshot();
    });
    // it('match snapshot with small size image', (): void => {
    //   const image = mount(<Image src={require('url')} size="small" alt="test" />);
    //   expect(toJson(image)).toMatchSnapshot();
    // });
    // it('match snapshot with large size and rounded image', (): void => {
    //   const image = mount(<Image src={require('url')} size="large" alt="test"/>);
    //   expect(toJson(image)).toMatchSnapshot();
    // });
  });
});