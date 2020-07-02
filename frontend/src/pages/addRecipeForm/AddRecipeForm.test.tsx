import React from 'react';
import { AddRecipeForm, ADD_RECIPE } from './AddRecipeForm';
import { renderApollo, cleanup } from '../../test.utils';


describe('component', (): void => {
  describe('EditRecipeForm', (): void => {
    afterEach(cleanup);
    it('render without error', async () => {

        const mocks = [
            {
              request: {
                query: ADD_RECIPE,
                variables: { title: "test", servings: 10, image: "test", readyInMinutes: 10, ingredients: ["test1"], detailedIngredients: ["test2"], instructions: "inst", sourceUrl: "myBlog.com"},
            },
            results: {},
          }
          ];
        renderApollo(<AddRecipeForm/>, {mocks});
    });
  });
});