import { shallow } from 'enzyme';
import React from 'react';
import { Upload } from 'antd';
import { ImageUpload } from './ImageUpload';
import { renderReact } from "../../test.utils";
import {screen} from '@testing-library/react'
import toJson from 'enzyme-to-json';


describe('component', (): void => {
  describe('ImageUpload', (): void => {
    it('match snapshot', (): void => {
      const wrapper = shallow(<ImageUpload />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('renders image with correct src', (): void => {
        const imageUrl = "https://res.cloudinary.com/drgb4slzt/image/upload/v1593443213/belhdjaq4pevmwydoept.jpg"
        renderReact(<ImageUpload imageUrl={imageUrl} form={jest.fn()} />);
        expect(screen.getByAltText('avatar')).toHaveAttribute("src", imageUrl);
      });

    it('match snapshot when given correct file format', ()=> {
      const file = {
        lastModified: 1592474852973,
        lastModifiedDate: 'Thu Jun 18 2020 12:07:32 GMT+0200 (Central European Summer Time)',
        name: "16800-blue-ribbon-apple-pie-600x600.jpg",
        originFileObj: new Blob([JSON.stringify({
          lastModified: 1592474852973,
          name: "16800-blue-ribbon-apple-pie-600x600.jpg",
          size: 128209,
          type: "image/jpeg",
          uid: "rc-upload-1593444261913-2",
          webkitRelativePath: "",
        })], {type : 'text/html'}),
        percent: 100,
        size: 128209,
        status: "uploading",
        type: "image/jpeg",
        uid: "rc-upload-1593444261913-2",
      };
      const beforeUpload = {
        lastModified: 1592474852973,
        name: "16800-blue-ribbon-apple-pie-600x600.jpg",
        size: 128209,
        type: "image/jpeg",
        uid: "rc-upload-1593597112355-2",
        webkitRelativePath: ""
      }
      const wrapper = shallow(<ImageUpload form={jest.fn()} />)
      wrapper.find(Upload).simulate('beforeUpload', {file});
      wrapper.find(Upload).prop<Function>('beforeUpload')(beforeUpload);

      wrapper.find(Upload).simulate('change', {file});
      wrapper.update();
      expect(toJson(wrapper)).toMatchSnapshot();

    });

    it('match snapshot when wrong file format was given', ()=> {
      const beforeUpload = {
        lastModified: 1590938637311,
        name: "now.json",
        size: 143,
        type: "application/json",
        uid: "rc-upload-1593597112355-4",
        webkitRelativePath: "",
      }

      const wrapper = shallow(<ImageUpload form={jest.fn()} />)
      wrapper.find(Upload).prop<Function>('beforeUpload')(beforeUpload);
      wrapper.update();

      expect(toJson(wrapper)).toMatchSnapshot();


    })

    it('match snapshot when too large image was given', ()=> {
      const beforeUpload = {
        lastModified: 1592474852973,
        name: "16800-blue-ribbon-apple-pie-600x600.jpg",
        size: 12820900,
        type: "image/jpeg",
        uid: "rc-upload-1593597112355-2",
        webkitRelativePath: ""
      }

      const wrapper = shallow(<ImageUpload form={jest.fn()} />)
      wrapper.find(Upload).prop<Function>('beforeUpload')(beforeUpload);
      wrapper.update();

      expect(toJson(wrapper)).toMatchSnapshot();
    })
  });
});