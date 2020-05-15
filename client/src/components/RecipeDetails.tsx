import * as React from "react";
import { Image, ButtonUI } from '../components';
import { Redirect, useParams, useLocation } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_RECIPE_DETAILS = gql`
  query GetRecipesDetails($id: String!) {
    recipeDetails(id: $id) {
        id:,
            title,
            summary,
            image,
            readyInMinutes,
            detailedIngredients,
            author,
            sourceUrl,
    }
  }
`;

export const RecipeDetails: React.FunctionComponent = (): React.ReactElement => {
    const { recipeID } = useParams();



    const { data, loading, error } = useQuery(
        GET_RECIPE_DETAILS,
        { variables: { id: recipeID } }
    );

    return (
        <div className="flex-item flex bg-milk bo mb-4 max-w-sm m-3">

        </div>
    );
};
