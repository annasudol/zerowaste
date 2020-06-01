import * as React from "react";
import { LoadingBar, ErrorMessage, Button, Image } from '../components';
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
  query GetRecipeDetails($id: ID!) {
    recipe(id: $id) {
        id,
        title,
        servings,
        image,
        readyInMinutes,
        detailedIngredients,
        author,
        sourceUrl,
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
    const { readyInMinutes, title, author, servings, image, detailedIngredients, sourceUrl } = data.recipe;
    const headerInfo = [{ text: "Ready in: ", value: readyInMinutes }, { text: "author ", value: author }, { text: "Servings: ", value: servings }]
    return (
        <div className="content">
            <div className="max-w-md p-4">
                <Button onClick={backRecipes} color="coral">back to results</Button>
                <h2 className="font-bebas uppercase text-darkGray mb-0">{title}</h2>
                {headerInfo.map((item, index) => {
                    if (item.value) {
                        return (
                            <React.Fragment key={index}>
                                <p className="font-roboto text-darkGray inline">{item.text} </p>
                                <p className="font-roboto text-green inline">{item.value}</p><br></br>
                            </React.Fragment>

                        )
                    }
                })}

                <div className="flex flex-col justify-center items-start md:flex-row-reverse md:justify-between">
                    <Image src={image} alt={`${title}'s image`} size="medium" />
                    <div>
                        <h3 className="font-roboto text-darkGray mb-0">Ingredients:</h3>
                        {detailedIngredients.map(ingredient => <p>{ingredient}</p>)}
                        <Button href={sourceUrl} >source link</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
