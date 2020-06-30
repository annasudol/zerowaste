import React from 'react';
import { ErrorMessage } from './ErrorMessage';
import {render, screen} from '@testing-library/react'

describe('component', (): void => {
  describe('ErrorMessage', (): void => {
    it('match snapshot', async () => {
      render(<ErrorMessage message="test" />);
      expect(await screen.findByText(/test/)).toBeInTheDocument();
    });
  });
});
