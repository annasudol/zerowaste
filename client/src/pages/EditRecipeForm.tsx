import * as React from "react";
import { useLocation, useHistory, useParams } from 'react-router';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Redirect } from "react-router";
import BackspaceIcon from '@material-ui/icons/Backspace';
import { RecipeForm } from "../components";
import { RecipeStateProps } from "../utils/types";
import { Button } from 'antd';
import { AppRoutes } from "../../routes";
import { Store } from 'antd/lib/form/interface';

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
    state: RecipeStateProps
    key?: string
}


export const EditRecipeForm: React.FC = (): React.ReactElement => {
    const location: LocationTypes = useLocation();
    const initialState: RecipeStateProps = location.state;
    const { recipeID } = useParams();
    const [updateRecipe, { data }] = useMutation(UPDATE_RECIPE);
    const history = useHistory();

    const handleSubmit = (inputValues: Store): any => {
        const { title, servings, image, readyInMinutes, ingredients, detailedIngredients, instructions, sourceUrl } = inputValues;
        updateRecipe({ variables: { id: recipeID, title, servings, image, readyInMinutes, ingredients, detailedIngredients, instructions, sourceUrl } });
    }

    if (data) {
        return <Redirect to={{ pathname: `/recipe/${data.updateRecipe.id}`, state: { backPath: '/user', callRefetch: true } }} />
    }
    return (
        <div className="content">
            <Button type="link" size="large" className="mt-4" onClick={(): any => history.push({ pathname: AppRoutes.User })}> <BackspaceIcon color="error" /></Button>
            <div className="flex justify-center items-center">
                <div className="w-1/2 recipe-form pb-4 pt-4">
                    <h1 className="form-header font-bebas uppercase text-darkGray text-center pb-0 m-0">Edit Recipe</h1>
                    <RecipeForm handleSubmit={(inputValues: Store): void => handleSubmit(inputValues)} defaultValues={initialState} />
                </div>
            </div>
        </div>
    )
};