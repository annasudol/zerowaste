import { useSubscription } from '@apollo/react-hooks';

import { gql } from "apollo-boost";
export const DELETE_RECIPE_SUBSCRIPTION = gql`
 subscription deleteRecipe {
  deleteRecipe {
    user {
      name
      email
      recipes{
        title
        id
        image
        ingredients
      }
    }
  }
 }
`;

interface Recipes {title: string, id: string, image: string, ingredients: string[]};

export const useSubscriptionDeleteRecipe = (): {updatedRecipes: Recipes[]} => {
    const {data} = useSubscription(DELETE_RECIPE_SUBSCRIPTION);
 
    return {updatedRecipes: data}
}