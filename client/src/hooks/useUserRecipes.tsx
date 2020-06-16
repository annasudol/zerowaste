import * as React from 'react';
import { gql } from "apollo-boost";

const GET_USER_SUBSCRIPTION = gql`
  subscription changesInRecipe{
    changesInRecipe {
        id
        title
        image
        ingredients
    }
  }
`;


export const useUserRecipes = (subscribeToMore, refetch) => {
    React.useEffect(() => {
        subscribeToMore({
            document: GET_USER_SUBSCRIPTION,
            updateQuery: (_previousResult, { subscriptionData }) => {
                if (subscriptionData) {
                    refetch();
                }

            },
        });
    }, [subscribeToMore]);
}