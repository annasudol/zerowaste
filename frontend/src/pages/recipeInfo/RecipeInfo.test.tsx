import React from 'react';
import { RecipeInfo, GET_RECIPE_DETAILS } from './RecipeInfo';
import * as router from 'react-router';
import { renderApollo, cleanup } from "../../test.utils";
import wait from "waait";

jest.mock('react-router', () => ({
    useParams: jest.fn(),
    useLocation: jest.fn(),
    useHistory: () => ({
        push: jest.fn(),
      }),
  }));


const location = {
    pathname: '/recipe/5efb130b3d664b27045bf085',
    state: {
        backPath: '/user'
    },
    search: '',
    hash: '',
    key: 'upph5v',
};

const recipe= {
    __typename: 'RecipeDetails',
    title: 'test',
    servings: 10,
    image: 'imageExample',
    readyInMinutes: 10,
    detailedIngredients: ['1/2 cup sugar', '1/2 cup packed brown sugar'],
    author: null,
    sourceUrl: 'myblog.com',
    instructions: 'test',
    user: {
       __typename: 'User',
        name: 'ann'
    }
}

describe('component', (): void => {
  describe('RecipeInfo', (): void => {
      beforeEach(()=>{
        jest.spyOn(router, 'useParams').mockReturnValue({ recipeID: "5efb130b3d664b27045bf085" });
        jest.spyOn(router, 'useLocation').mockReturnValue(location);
      });
      afterEach(cleanup);

        it('match snapshot', async () => {
        let mocks = [
            {
                request: { query: GET_RECIPE_DETAILS, variables: { id: "5efb130b3d664b27045bf085" } },
                result: { data: { recipe } },
              },
        ];
        const wrapper  =renderApollo(<RecipeInfo />, {mocks});

        expect(wrapper).toMatchSnapshot();
        });

        it('match snapshot when loading', async () => {
          let mocks = [
              {
                  request: { query: GET_RECIPE_DETAILS, variables: { id: "5efb130b3d664b27045bf085" } },
                  result: { data: {recipe: {} }, loading: true },
                },
          ];
          const wrapper  =renderApollo(<RecipeInfo />, {mocks});
          await wait(0); // wait for response

          expect(wrapper).toMatchSnapshot();
        });

        it('match snapshot when no data was found', async () => {
          let mocks = [
              {
                  request: { query: GET_RECIPE_DETAILS, variables: { id: "5efb130b3d664b27045bf085" } },
                  result: { data: {} },
              },
          ];
          const wrapper=renderApollo(<RecipeInfo />, {mocks});
          await wait(0); // wait for response

          expect(wrapper).toMatchSnapshot();
        });
    });
});
