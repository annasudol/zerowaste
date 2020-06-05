import * as React from "react";
import { useLocation, useHistory } from 'react-router';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Redirect } from "react-router";
import BackspaceIcon from '@material-ui/icons/Backspace';
import { Button, Input, List, RecipeForm } from "../components";
import { RecipeStateProps } from "../utils/types";

import { AppRoutes } from "../../routes";

const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($id: ID! $title: String! $servings: Int! $image: String!, $readyInMinutes: Int! $ingredients: [String!]! $detailedIngredients: [String!]! $instructions: String! $sourceUrl: String) {
    updateRecipe(id: $id title: $title, servings: $servings image: $image, readyInMinutes: $readyInMinutes, ingredients: $ingredients, detailedIngredients: $detailedIngredients, instructions: $instructions, sourceUrl: $sourceUrl) {
        id
    }
  }
`;

export interface LocationTypes {
    hash?: string
    pathname: string
    search?: string
    state: RecipeProps
    key?: string
}

interface RecipeProps extends RecipeStateProps {
    id: string
}
interface EditRecipeFormProps {
    initialState: RecipeProps
}

export const EditRecipeForm: React.FunctionComponent = (): React.ReactElement | any => {
    const location: LocationTypes = useLocation();
    const initialState: RecipeProps = location.state;

    const [updateRecipe, { data, error, loading }] = useMutation(UPDATE_RECIPE);

    const handleSubmit = (inputValues: RecipeStateProps): any => {
        const { title, servings, image, readyInMinutes, ingredients, detailedIngredients, instructions, sourceUrl } = inputValues;
        updateRecipe({ variables: { id: initialState.id, title, servings, image, readyInMinutes, ingredients, detailedIngredients, instructions, sourceUrl } });
    }
    // const handleSubmit = (event: any): any => {
    //     event.preventDefault();
    //     if (emptyState) {
    //         setValidation(false)
    //     } else {
    //         setValidation(true)
    //         console.log(title, servings, image, readyInMinutes, ingredients, detailedIngredients, instructions, "title, servings, image, readyInMinutes, ingredients, detailedIngredients, instructions")
    //         updateRecipe({ variables: { id: initialState.id, title, servings, image: "https://spoonacular.com/recipeImages/543832-556x370.jpg", readyInMinutes, ingredients, detailedIngredients, instructions, sourceUrl } });
    //     }

    // }


    const history = useHistory();
    if (data) {
        return <Redirect to={{ pathname: `/recipe/${data.updateRecipe.id}`, state: { backPath: '/user' } }} />
    }
    return (
        <div className="content">
            <Button className="mt-4" color="coral" onClick={(): any => history.push({ pathname: AppRoutes.User })}> <BackspaceIcon /></Button>
            <div className="flex justify-center items-center">
                <div className="w-1/2 recipe-form pb-4 pt-4">
                    <h1 className="form-header font-bebas uppercase text-darkGray text-center pb-0 m-0">Edit Recipe</h1>
                    <RecipeForm handleSubmit={(inputValues: RecipeStateProps): void => handleSubmit(inputValues)} />

                </div>
            </div>
        </div>
    )
};