import { shallow } from 'enzyme';
import React from 'react';
import { Upload } from 'antd';

import toJson from 'enzyme-to-json';
import { ImageUpload } from './ImageUpload';
import { act } from "react-dom/test-utils";

describe('component', (): void => {
  describe('ImageUpload', (): void => {
    it('match snapshot', (): void => {
      const wrapper = shallow(<ImageUpload />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('renders image with correct src when imageUrl is given', (): void => {
        const imageUrl = "https://res.cloudinary.com/drgb4slzt/image/upload/v1593443213/belhdjaq4pevmwydoept.jpg"
        const wrapper = shallow(<ImageUpload imageUrl={imageUrl} form={jest.fn()} />)
        expect(wrapper.find('img').prop("src")).toBe(imageUrl);
      });
      //TODO: finish test
    it('zzz', ()=> {
      const imageUrl = "https://res.cloudinary.com/drgb4slzt/image/upload/v1593443213/belhdjaq4pevmwydoept.jpg"
      const file = {
        lastModified: 1592474852973,
        lastModifiedDate: 'Thu Jun 18 2020 12:07:32 GMT+0200 (Central European Summer Time)',
        name: "16800-blue-ribbon-apple-pie-600x600.jpg",
        originFileObj: {
          lastModified: 1592474852973,
          name: "16800-blue-ribbon-apple-pie-600x600.jpg",
          size: 128209,
          type: "image/jpeg",
          uid: "rc-upload-1593444261913-2",
          webkitRelativePath: "",
        },
        percent: 100,
        size: 128209,
        status: "uploading",
        type: "image/jpeg",
        uid: "rc-upload-1593444261913-2",
      }
      const wrapper = shallow(<ImageUpload imageUrl={imageUrl} form={jest.fn()} />)
 
      wrapper.find(Upload).prop<Function>('onChange')({info: { file }});

    });
  });
});