import { useEffect } from 'react';

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


export const useUserRecipes = (subscribeToMore: any, refetch: any) => {
   useEffect(() => {
        subscribeToMore({
            document: GET_USER_SUBSCRIPTION,
            updateQuery: (_previousResult: any, subscriptionData: any) => {
                if (subscriptionData) {
                    refetch();
                }

            },
        });
    }, [refetch, subscribeToMore]);
}