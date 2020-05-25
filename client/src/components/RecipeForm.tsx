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
    ingredients: string[]
    readyInMinutes: number
    sourceUrl: string
}




export const RecipeForm: React.FunctionComponent = (): React.ReactElement => {
    // const [recipeData, setRecipeData] = React.useState<Inputs>();
    const { handleSubmit, register, reset, control, errors } = useForm();
    const { detailedIngredients, addDetailedIngredient, deleteDetailedIngredient } = useDetailedIngredientState();
    const { steps, addStep, deleteStep } = useStepsState();
    const [createRecipe, { data, loading, error }] = useMutation(ADD_RECIPE);


    const history = useHistory();

    const onSubmit = info => {
        const { title, ingredients, sourceUrl, readyInMinutes } = info;

        // createRecipe({ variables: { title, image: 'https://spoonacular.com/recipeImages/543832-556x370.jpg', readyInMinutes: 20, ingredients, detailedIngredients, steps, sourceUrl, author: 'kevin', authorId: "2" } });
        // return data && data.createRecipe && history.push({ pathname: `/recipe/${data.createRecipe.id}` });
    }
    return (
        <div className="content p-10">
            <div className="flex justify-center items-center">
                <div className="flex flex-col w-1/2 recipe-form">
                    <h1 className="form-header font-bebas uppercase text-darkGray text-center pb-0 m-0">Add Recipe</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {errors.title && <ErrorMessage validationMessage='Title is Required' />}
                        <input name="title" type="text" placeholder="Title" ref={register({ required: true })} />
                        {errors.readyInMinutes && <ErrorMessage validationMessage='Add preparation time' />}

                        <input name="readyInMinutes" type="number" placeholder="Ready In Minutes" ref={register({
                            required: true, min: 0
                        })} />

                        <Controller
                            as={
                                <Autocomplete
                                    multiple
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
                                            label="Add ingredients to make the recipe searchable"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            }
                            // tslint:disable-next-line: no-shadowed-variable
                            onChange={([, data]) => data}
                            name="ingredients"
                            control={control}
                            ref={register({ required: true, minLength: 1 })}

                        />                        <ListAddForm saveItem={(text: string) => {
                            const trimmedText = text.trim();
                            if (trimmedText.length > 0) {
                                addDetailedIngredient(trimmedText);
                            }
                        }}
                            placeholder="Add detailed ingredients eg: 1 tbsp olive oil"
                        />
                        <ListUI list={detailedIngredients} deleteItem={(index: number): any => deleteDetailedIngredient(index)} />

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
                        <input name="sourceUrl" type="text" placeholder="Source Url" ref={register({ required: false })} />
                        <input type="submit" title="Submit" className="bg-green hover:bg-green text-white font-bold py-2 px-4 rounded outline-none m-1 border-0" />
                    </form>
                </div>
            </div>
        </div>
    )
};
