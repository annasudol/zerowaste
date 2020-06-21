import React, { FC, ReactElement } from 'react';

import { ErrorMessage, LoadingBar, RecipeForm } from '../../components'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Redirect } from 'react-router';
import { Store } from 'antd/lib/form/interface';

const ADD_RECIPE = gql`
  mutation CreateRecipe($title: String! $servings: Int! $image: String!, $readyInMinutes: Int! $ingredients: [String!]! $detailedIngredients: [String!]! $instructions: String! $sourceUrl: String) {
    createRecipe(title: $title, servings: $servings image: $image, readyInMinutes: $readyInMinutes, ingredients: $ingredients, detailedIngredients: $detailedIngredients, instructions: $instructions, sourceUrl: $sourceUrl) {
        id
    }
  }
`;


export const AddRecipeForm: FC = (): ReactElement => {

    const [createRecipe, { data, error, loading }] = useMutation(ADD_RECIPE);

    const handleSubmit = (inputValues: Store, imageUrl: string) => {
        const { title, servings, readyInMinutes, ingredients, detailedIngredients, instructions, sourceUrl } = inputValues;
        createRecipe({ variables: { title, servings, image: imageUrl, readyInMinutes, ingredients, detailedIngredients, instructions, sourceUrl } });
    }

    if (loading) return <LoadingBar />
    if (error) {
        return (<ErrorMessage message={`ERROR: ${error.message}`}></ErrorMessage>)
    }
    if (data) {
        return <Redirect to={{ pathname: `/recipe/${data.createRecipe.id}`, state: { backPath: '/user' } }} />
    }

    return (

        <div className='recipes-form'>
            <div className='flex flex-col w-2/3 recipe-form'>
                <h1 className='form-header font-bebas uppercase text-darkGray text-center pb-0 m-0'>Add Recipe</h1>
                <RecipeForm handleSubmit={(inputValues: Store, imageUrl: string): void => handleSubmit(inputValues, imageUrl)} fillForm />
            </div>
        </div>

    )
};