import React from 'react';
import { App } from './App';
import { renderReact } from "../../test.utils";

import {screen} from '@testing-library/react'

describe('component', (): void => {
  describe('App', (): void => {
    it('renders elements', (): void => {
      renderReact(<App />);
      expect(screen.getByText(/home/i)).toBeInTheDocument();
      expect(screen.getByText(/login/i)).toBeInTheDocument();
      expect(screen.getByText(/sign up/i)).toBeInTheDocument();
      expect(screen.getByText(/your spare food/i)).toBeInTheDocument();
      expect(screen.getAllByAltText(/fridge/i)).toMatchSnapshot(`[<img alt="fridge" class="w-64" src="[object Object]" />]`)
    });
  });
});
