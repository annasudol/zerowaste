import { shallow } from 'enzyme';
import React from 'react';
import { RecipeItem, GET_RECIPE_DETAILS } from '../../components';
import toJson from 'enzyme-to-json';
import { renderApollo, cleanup,  fireEvent, waitForElement } from '../../test.utils';
import { HashRouter } from 'react-router-dom';
import { act } from "react-dom/test-utils";



describe('component', (): void => {
  describe('RecipeItem', (): void => {
    afterEach(cleanup);
    it('match snapshot', (): void => {
      const wrapper = shallow(<RecipeItem  id="1" title="test" image="img" ingredients={["ing1"]}/>);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('responds for opening delete recipe modal', (): void => {
      const wrapper = shallow(<RecipeItem  id="1" title="test" image="img" ingredients={["ing1"]} deleteEditBtn/>);
      act(()=> {
        wrapper.find('Button[className="mr-2"]').simulate('click');
      })
      expect(toJson(wrapper)).toMatchSnapshot();

    });
    //TODO: finish test
    it('match snapshot 2', async () => {

        const mocks = [
            {
              request: {
                query: GET_RECIPE_DETAILS,
                variables: { id: "5ef248ca324f6aaa02bfd7a0" },
                results: { recipe:  {
                    _typename: "RecipeDetails",
                    author: null,
                    detailedIngredients: ['test'],
                    image: "http://res.cloudinary.com/drgb4slzt/image/upload/v1593443213/belhdjaq4pevmwydoept.jpg",
                    instructions: "test",
                    readyInMinutes: 130,
                    servings: 8,
                    sourceUrl: "myblog.com",
                    title: "Apple Pie",
                    user: {
                        __typename: "User",
                        name: "anna"
                    }
                }},
              }
            }
          ]
          const {findByText} = renderApollo(<HashRouter><RecipeItem  id="5ef248ca324f6aaa02bfd7a0" title="test" image="img" ingredients={["ing1"]} deleteEditBtn/></HashRouter>, {mocks})
          const editButton =  await waitForElement(() => findByText(/edit Recipe/i));
          act(()=> {
            fireEvent.click(editButton);
          })
      });
    });
});

