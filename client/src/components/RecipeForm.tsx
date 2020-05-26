import * as React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { ErrorMessage, ListAddForm, ListType } from "../UElements";
import { ListUI } from '../components'
import { useStepsState, useDetailedIngredientState, useRecipeFormState, initialState } from "../hooks";
import { useHistory } from 'react-router';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import products = require("../assets/data/products.json");

const productsTitles = products.reduce((accumulator: any, currentValue: ListType) => {
    return [...accumulator, currentValue.title]
}, []);



const ADD_RECIPE = gql`
  mutation AddRecipe($title: String! $image: String $readyInMinutes: Int! $ingredients: [String!]! $detailedIngredients: [String!]! $steps: [String!] $sourceUrl: String $author: String $authorId: String) {
    createRecipe(title: $title, image: $image, readyInMinutes: $readyInMinutes, ingredients: $ingredients, detailedIngredients: $detailedIngredients, steps: $steps, sourceUrl: $sourceUrl, author: $author, authorId: $authorId) {
        id
        title
    }
  }

`;


export const RecipeForm: React.FunctionComponent = (): React.ReactElement => {
    const { detailedIngredients, addDetailedIngredient, deleteDetailedIngredient } = useDetailedIngredientState();
    const { steps, addStep, deleteStep } = useStepsState();
    const [createRecipe, { data, error }] = useMutation(ADD_RECIPE);
    const [emptyInput, setEmptyInput] = React.useState<boolean>(false);
    const { title, ingredients, readyInMinutes, sourceUrl, dispatch } = useRecipeFormState();

    const history = useHistory();

    const handleSubmit = (event): any => {

        event.preventDefault();

        if (initialState.title || initialState.readyInMinutes || ingredients.length === 0 || detailedIngredients.length === 0 || steps.length === 0) {
            setEmptyInput(true)
        } else {
            setEmptyInput(false)
            createRecipe({ variables: { title, image: 'https://spoonacular.com/recipeImages/543832-556x370.jpg', readyInMinutes, ingredients, detailedIngredients, steps, sourceUrl, author: 'kevin', authorId: "2" } });
            history.push({ pathname: `/recipe/${data.createRecipe.id}` });
        }

    }


    if (error) {
        return (<ErrorMessage message='Error with adding recipe, please try later' />)
    }
    return (
        <div className="content p-10">
            <div className="flex justify-center items-center">
                <div className="flex flex-col w-1/2 recipe-form">
                    <h1 className="form-header font-bebas uppercase text-darkGray text-center pb-0 m-0">Add Recipe</h1>
                    <form onSubmit={(e): any => handleSubmit(e)}>
                        {emptyInput && initialState.title && <ErrorMessage validationMessage='Add title' />}
                        <input name="title" type="text" placeholder="Title" className="mt-2 mb-2" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => dispatch({ TYPE: 'ADD_TITLE', setTitle: e.target.value })} />
                        {emptyInput && readyInMinutes === 0 && <ErrorMessage validationMessage='Add preparation time' />}
                        <input name="readyInMinutes" type="number" placeholder="Ready In Minutes" className="mt-2 mb-2" value={readyInMinutes}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                const val = parseInt(e.target.value, 10);
                                if (val > 0) dispatch({ TYPE: 'ADD_READY_IN_MINUTES', setMinutes: val })
                            }} />
                        {emptyInput && ingredients.length === 0 && <ErrorMessage validationMessage='Add ingredients to make the recipe searchable' />}
                        <Autocomplete
                            multiple
                            className="mt-4 mb-4"
                            options={productsTitles}
                            getOptionLabel={option => option}
                            renderOption={option => (
                                <span>
                                    {option}
                                </span>
                            )}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    label="Search for ingredients"
                                    variant="outlined"
                                />
                            )}
                            onChange={(event, value: string[], reason): void => dispatch({ TYPE: 'ADD_INGREDIENTS', setIngredients: value })}
                            value={ingredients}
                        />
                        {emptyInput && detailedIngredients.length === 0 && <ErrorMessage validationMessage='Add detailed ingredients eg: 1 tbsp olive oil' />}

                        <ListAddForm saveItem={(text: string) => {
                            const trimmedText = text.trim();
                            if (trimmedText.length > 0) {
                                addDetailedIngredient(trimmedText);
                            }
                        }}
                            placeholder="Add detailed ingredients"
                        />
                        <ListUI list={detailedIngredients} deleteItem={(index: number): any => deleteDetailedIngredient(index)} />
                        {emptyInput && steps.length === 0 && <ErrorMessage validationMessage='Add recipe steps' />}
                        <ListAddForm saveItem={(text: string) => {
                            const trimmedText = text.trim();
                            if (trimmedText.length > 0) {
                                addStep(trimmedText);
                            }
                        }}
                            placeholder="Add steps eg.: Preheat oven to 350º. Rinse rice under cold water until the water runs clear. Bring a large pot of water to a boi"
                            textarea={true}
                        />
                        <ListUI list={steps} deleteItem={(index: number): any => deleteStep(index)} />
                        <input name="sourceUrl" type="text" placeholder="Source Url" value={sourceUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => dispatch({ TYPE: 'ADD_SOURCE_URL', setUrl: e.target.value })} />
                        <button type="submit" className="bg-green hover:bg-green text-white font-bold py-2 px-4 rounded outline-none m-1 border-0">Send Recipe</button>
                    </form>
                </div>
            </div>
        </div>
    )
};