import React from 'react';
import { EditRecipeForm, UPDATE_RECIPE } from './EditRecipeForm';
import { renderApollo, cleanup,  fireEvent, waitForElement } from '../../test.utils';
import toJson from 'enzyme-to-json';

import * as router from 'react-router';
import { shallow } from "enzyme";
const location = {
  pathname: '/editRecipe/5efb130b3d664b27045bf085',
  state: {
    title: 'Apple Pie',
    servings: 8,
    image: "http://res.cloudinary.com/drgb4slzt/image/upload/v1593512714/a4ghjbymhrazfftekznz.jpg",
    readyInMinutes: 130,
    detailedIngredients: ['test1'],
    instructions: 'In a small bowl, combine the sugars, flour and spices; set aside. In a large bowl, toss apples with lemon juice. Add sugar mixture; toss to coat.\nPie plate with bottom crust; trim even with edge. Fill with apple mixture; dot with butter. Roll remaining crust to fit the top of pie; place overfilling. Trim, seal and flute edges. Cut slits in crust.\nBeat egg white until foamy; brush over crust. Sprinkle with sugar. Cover edges loosely with foil.\nBake at 375° for 25 minutes. Remove foil and bake until crust is golden brown and filling is bubbly, 20-25 minutes longer. Cool on a wire rack.',
    sourceUrl: 'myblog.com',
  },
  search: '',
  hash: '',
  key: 'upph5v',
};
jest.mock('react-router', () => ({
  useLocation: jest.fn(),
  useParams: jest.fn(),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));



describe('component', (): void => {
  describe('EditRecipeForm', (): void => {
    afterEach(cleanup);
    beforeEach(() => {
      jest.spyOn(router, 'useLocation').mockReturnValue({ ...location });
      jest.spyOn(router, 'useParams').mockReturnValue({ recipeID: "5efb130b3d664b27045bf085" });
      // jest.spyOn(router, 'useHistory').mockReturnValue({ pathname: "test" });

      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(), // deprecated
          removeListener: jest.fn(), // deprecated
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
    });
  });

    it('match snapshot when clicking back button', async () => {

        const mocks = [
            {
              request: {
                query: UPDATE_RECIPE,
                variables: { id: "5ef248ca324f6aaa02bfd7a0", title: "test", servings: 10, image: "test", readyInMinutes: 10, ingredients: ["test1"], detailedIngredients: ["test2"], instructions: "inst", sourceUrl: "myBlog.com"},
            },
            results: { recipe:  {id: "5ef248ca324f6aaa02bfd7a0"}},
          }
          ];
         const {findByTitle, container} = renderApollo(<EditRecipeForm/>, {mocks});
        const backButton =  await waitForElement(() => findByTitle('back'))
        fireEvent.click(backButton);

        expect(container).toMatchSnapshot();

    });
  });
});
