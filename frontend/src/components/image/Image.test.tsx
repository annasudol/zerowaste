import React from 'react';
import { Image } from './Image';
import {render} from '@testing-library/react'

describe('component', (): void => {
  describe('Image', (): void => {
    it('match snapshot with medium size image', (): void => {
      const {getByAltText} = render(<Image src='url' size="medium" alt="test" />);
   
     expect(getByAltText('test')).toBeInTheDocument();
    });
    it('match snapshot with small size image', (): void => {
      const {getByAltText} = render(<Image src='url' size="small" alt="test" />);
      expect(getByAltText('test')).toBeInTheDocument();
    });
    it('match snapshot with large size image', (): void => {
      const {getByAltText} = render(<Image src='url' size="large" alt="test"/>);
      expect(getByAltText('test')).toBeInTheDocument();
    });

    it('match snapshot with full size image', (): void => {
      const {getByAltText} = render(<Image src='url' size="full" alt="test"/>);
      expect(getByAltText('test')).toBeInTheDocument();
    });

    it('match snapshot with no image size', (): void => {
      const {getByAltText} = render(<Image src='url' alt="test"/>);
      expect(getByAltText('test')).toBeInTheDocument();
    });
  });
});