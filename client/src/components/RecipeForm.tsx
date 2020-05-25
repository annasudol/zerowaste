import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { IngredientSelect, ErrorMessage } from "../UElements";
import { ListUI } from '../components'
import { useDetailedIngredientState } from "../hooks/useDetailedIngredientState";
import { ListAddForm } from "../UElements/ListAddForm";
import { useStepsState } from "../hooks/useStepsState";
import { useHistory } from 'react-router';

import products = require("../assets/data/products.json");
import { ListType } from "../UElements/";

const productsTitles = products.reduce((accumulator: any, currentValue: ListType) => {
    return [...accumulator, currentValue.title]
}, []);

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

const ADD_RECIPE = gql`
  mutation AddRecipe($title: String! $image: String $readyInMinutes: Int! $ingredients: [String!]! $detailedIngredients: [String!]! $steps: [String!] $sourceUrl: String $author: String $authorId: String) {
    createRecipe(title: $title, image: $image, readyInMinutes: $readyInMinutes, ingredients: $ingredients, detailedIngredients: $detailedIngredients, steps: $steps, sourceUrl: $sourceUrl, author: $author, authorId: $authorId) {
        id
        title
    }
  }

`;



type Inputs = {
    title: string
    ingredients: string[] | []
    detailedIngredients: string[] | []
    readyInMinutes: number
    sourceUrl: string
}




export const RecipeForm: React.FunctionComponent = (): React.ReactElement => {
    // const { handleSubmit, register, reset, control, errors, clearError, setError } = useForm<Inputs>();
    const { detailedIngredients, addDetailedIngredient, deleteDetailedIngredient } = useDetailedIngredientState();
    const { steps, addStep, deleteStep } = useStepsState();
    const [createRecipe, { data, loading, error }] = useMutation(ADD_RECIPE);
    const [title, setTitle] = React.useState<string>('');
    const [readyInMinutes, setReadyInMinutes] = React.useState<number>(0);
    const [ingredients, setIngredients] = React.useState<string[] | []>([]);
    const [sourceUrl, setSourceUrl] = React.useState<string>('');
    const [emptyInput, setEmptyInput] = React.useState<boolean>(false);

    const history = useHistory();


    const handleSubmit = (event): any => {

        event.preventDefault();

        if (title === '' || readyInMinutes === 0 || ingredients.length === 0 || detailedIngredients.length === 0 || steps.length === 0) {
            setEmptyInput(true)
        } else {
            setEmptyInput(false)
            createRecipe({ variables: { title, image: 'https://spoonacular.com/recipeImages/543832-556x370.jpg', readyInMinutes: 20, ingredients, detailedIngredients, steps, sourceUrl, author: 'kevin', authorId: "2" } });
            history.push({ pathname: `/recipe/${data.createRecipe.id}` });
        }

    }



    return (
        <div className="content p-10">
            <div className="flex justify-center items-center">
                <div className="flex flex-col w-1/2 recipe-form">
                    <h1 className="form-header font-bebas uppercase text-darkGray text-center pb-0 m-0">Add Recipe</h1>
                    <form onSubmit={(e): any => handleSubmit(e)}>
                        {emptyInput && title === '' && <ErrorMessage validationMessage='Add title' />}
                        <input name="title" type="text" placeholder="Title" className="mt-2 mb-2" value={title} onChange={(e: any): any => setTitle(e.target.value)} />
                        {emptyInput && readyInMinutes === 0 && <ErrorMessage validationMessage='Add preparation time' />}
                        <input name="readyInMinutes" type="number" placeholder="Ready In Minutes" className="mt-2 mb-2" value={readyInMinutes} onChange={(e: any): any => setReadyInMinutes(e.target.value)} />
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
                            onChange={(event, value, reason): any => setIngredients(value)}
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
                        <input name="sourceUrl" type="text" placeholder="Source Url" value={sourceUrl} onChange={(e: any): any => setSourceUrl(e.target.value)} />
                        <button type="submit" className="bg-green hover:bg-green text-white font-bold py-2 px-4 rounded outline-none m-1 border-0">Send Recipe</button>
                    </form>
                </div>
            </div>
        </div>
    )
};