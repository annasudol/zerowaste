import React from 'react';
import { DialogDeleteRecipe, DELETE_RECIPE } from './DialogDeleteRecipe';
import * as apollo from '@apollo/react-hooks';
import { renderApollo, cleanup,  fireEvent, waitForElement } from '../../test.utils';
import { act } from "react-dom/test-utils";


describe('component', () => {
  describe('DialogDeleteRecipe', () => {
    afterEach(cleanup);
      it('match snapshots', (): void => {
        const spy = jest.spyOn(apollo, 'useSubscription');

        spy.mockReturnValue({
            variables: { id: "5ef248ca324f6aaa02bfd7a0" },
            loading: false,
        });

        const mocks = [
          {
            request: {
              query: DELETE_RECIPE,
              variables: { id: "5ef248ca324f6aaa02bfd7a0" },
            },
            results: {}
          }
        ]
     const {container} = renderApollo(<DialogDeleteRecipe open toggleOpen={jest.fn()} recipeId="1" title="dialog title" image="myImage" />, {mocks})

     expect(container.firstChild).toMatchSnapshot();
      });

      it('responds for keeping recipe', async () => {
        const spy = jest.spyOn(apollo, 'useSubscription');

        spy.mockReturnValue({
            variables: { id: "5ef248ca324f6aaa02bfd7a0" },
            loading: false,
        });

        const mocks = [
          {
            request: {
              query: DELETE_RECIPE,
              variables: { id: "5ef248ca324f6aaa02bfd7a0" },
            },
            results: {data: { id: "5ef248ca324f6aaa02bfd7a0" }}

          }
        ]
        const mockToggleOpen = jest.fn();
        const {findByText} = renderApollo(<DialogDeleteRecipe open toggleOpen={mockToggleOpen} recipeId="1" title="dialog title" image="myImage" />, {mocks})
        const deleteButton =  await waitForElement(() => findByText(/keep the recipe/i))
        act(()=> {
          fireEvent.click(deleteButton);
        })
        expect(mockToggleOpen).toHaveBeenCalledWith(false);
      });
      it('responds for closing dialog and delete recipe', async () => {

        const spy = jest.spyOn(apollo, 'useSubscription');

        spy.mockReturnValue({
            variables: { id: "5ef248ca324f6aaa02bfd7a0" },
            loading: false,
        });

        const mocks = [
          {
            request: {
              query: DELETE_RECIPE,
              variables: { id: "5ef248ca324f6aaa02bfd7a0" },
              results: {data: { id: "5ef248ca324f6aaa02bfd7a0" }}
            }
          }
        ]
        const mockToggleOpen = jest.fn();
        const {findByText} = renderApollo(<DialogDeleteRecipe open toggleOpen={mockToggleOpen} recipeId="1" title="dialog title" image="myImage" />, {mocks})
        const deleteButton =  await waitForElement(() => findByText(/delete recipe/i))
        act(()=> {
          fireEvent.click(deleteButton);
        })
        expect(mockToggleOpen).toHaveBeenCalledWith(false);
      });
    });
});

