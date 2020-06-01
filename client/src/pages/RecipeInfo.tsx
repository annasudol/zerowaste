import * as React from "react";
import { LoadingBar, ErrorMessage } from '../components';
import { useParams, useHistory } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AppRoutes } from "../../routes";

// const GET_RECIPE_DETAILS = gql`
//   query GetRecipe($id: String!) {
//     recipe(id: $id) {
//         id,
//         title,
//     }
//   }
// `;

const GET_RECIPE_DETAILS = gql`
  query GetRecipeDetails($recipeID: String!) {
    recipe(id: $id) {
        id
        title
        image
    }
  }
`;

export const RecipeInfo: React.FunctionComponent = (): React.ReactElement => {
    const { recipeID } = useParams();
    const history = useHistory();

    const { data, loading, error } = useQuery(
        GET_RECIPE_DETAILS,
        { variables: { id: recipeID } }
    );

    if (loading) return <LoadingBar />
    if (error) return <ErrorMessage message={`ERROR: ${error.message}`}></ErrorMessage>;
    if (!data) return <ErrorMessage message="Not found"></ErrorMessage>;

    const backRecipes = (): void => {
        return history.push({ pathname: AppRoutes.RecipesList });
    }
    return (
        <div className="content">
            <div className="max-w-md p-4">

            </div>
        </div>
    );
};
// <Button onClick={backRecipes} color="coral">back to results</Button>

// //  <h2 className="font-bebas uppercase text-darkGray mb-0">{data.recipeDetails.title}</h2>
// <div>
// <p className="font-roboto text-darkGray inline">Ready in: </p>
// <p className="font-roboto text-green inline">{data.recipeDetails.readyInMinutes} min.</p>
// </div>
// <div>
// <p className="font-roboto text-darkGray inline">Author: </p>
// <p className="font-roboto text-green inline">{data.recipeDetails.author ? data.recipeDetails.author : 'unknown'}</p>
// </div>
// <div className="flex flex-col justify-center items-start md:flex-row-reverse md:justify-between">
// <Image src={data.recipeDetails.image} alt={`${data.recipeDetails.title}'s image`} size="medium" />
// <div>
//     <h3 className="font-roboto text-darkGray mb-0">Ingredients:</h3>
//     {data.recipeDetails.detailedIngredients.map(ingredient => <p>{ingredient}</p>)}
//     <Button href={data.recipeDetails.sourceUrl} >source link</Button>
// </div>
// </div>