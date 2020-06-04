import * as React from "react";
import { List, ErrorMessage, ListFormInput, LoadingBar, Button, Input } from '../components'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Redirect } from "react-router";
import { useForm } from "../hooks/useForm";
import { VALIDATOR_MINLENGTH, VALIDATOR_MIN, VALIDATOR_URL } from '../utils/validators';

const ADD_RECIPE = gql`
  mutation CreateRecipe($title: String! $servings: Int! $image: String!, $readyInMinutes: Int! $ingredients: [String!]! $detailedIngredients: [String!]! $instructions: String! $sourceUrl: String) {
    createRecipe(title: $title, servings: $servings image: $image, readyInMinutes: $readyInMinutes, ingredients: $ingredients, detailedIngredients: $detailedIngredients, instructions: $instructions, sourceUrl: $sourceUrl) {
        id
    }
  }
`;
const initialState = {
    title: "",
    servings: 0,
    image: "",
    readyInMinutes: 0,
    ingredients: [],
    detailedIngredients: [],
    instructions: "",
    sourceUrl: undefined
}

export const AddRecipeForm: React.FunctionComponent = (): React.ReactElement => {
    const [validation, setValidation] = React.useState<boolean>(true);
    const { formState,
        inputHandler,
        setServings,
        setImage,
        setIngredients,
        setDetailedIngredients,
        deleteDetailedIngredients,
        setReadyInMinutes,
        setInstructions,
        setSourceUrl } = useForm({ ...initialState });
    const { title, servings, image, readyInMinutes, ingredients, detailedIngredients, instructions, sourceUrl } = formState;
    const emptyState = title === "" || servings === 0 || image === "" || readyInMinutes === 0 || ingredients === [] || detailedIngredients === [] || instructions === ""
    const [createRecipe, { data, error, loading }] = useMutation(ADD_RECIPE);


    const handleSubmit = (event: any): any => {
        event.preventDefault();
        if (emptyState) {
            setValidation(false)
            console.log(formState, "emty")
        } else {
            setValidation(true)
            createRecipe({ variables: { title, servings, image: "https://spoonacular.com/recipeImages/543832-556x370.jpg", readyInMinutes, ingredients, detailedIngredients, instructions, sourceUrl } });
        }

    }

    if (loading) return <LoadingBar />
    if (error) {
        return (<ErrorMessage message={`ERROR: ${error.message}`}></ErrorMessage>)
    }
    if (data) {
        return <Redirect to={{ pathname: `/recipe/${data.createRecipe.id}`, state: { backPath: '/user' } }} />
    }

    return (
        <div className="content p-10">
            <div className="flex justify-center items-center">
                <div className="flex flex-col w-1/2 recipe-form">
                    <h1 className="form-header font-bebas uppercase text-darkGray text-center pb-0 m-0">Add Recipe</h1>
                    <form onSubmit={(e): any => handleSubmit(e)}>
                        <Input id="title" onInput={inputHandler} type="text" initialValue="" validation={validation} validators={[VALIDATOR_MINLENGTH(3)]} errorText="Title input is required" label="Title" />
                        <Input id="servings" onInput={setServings} type="number" initialValue={0} validation={validation} validators={[VALIDATOR_MIN(1)]} errorText="Add servings value min. 1" label="Servings" />
                        <Input id="readyInMinutes" onInput={setReadyInMinutes} type="number" initialValue={0} validation={validation} validators={[VALIDATOR_MIN(5)]} errorText="Add preparation time, min. 5 min" label="Ready In Minutes" />
                        <ListFormInput id="ingredients" onInput={setIngredients} list={formState.ingredients} validation={validation} type="autocomplete" errorText="Add ingredients to make the recipe searchable" />
                        <ListFormInput id="detailedIngredients" onInput={setDetailedIngredients} list={formState.detailedIngredients} validation={validation} validators={[VALIDATOR_MINLENGTH(3)]} type="form" errorText="Add detailed ingredients eg: 1 tbsp olive oil" label="Detailed Ingridient" />
                        <List list={formState.detailedIngredients || []} deleteItem={(index: number): any => deleteDetailedIngredients(index)} />
                        <Input id="instructions" onInput={setInstructions} type="text" initialValue="" validation={validation} validators={[VALIDATOR_MINLENGTH(10)]} errorText="Add detailed instructions, min. 10 characters" label="Instructions" />
                        <Input id="sourceUrl" onInput={setSourceUrl} type="text" initialValue="" validation={validation} validators={[VALIDATOR_URL]} label="Source Url" />
                        <Button type="submit">Send Recipe</Button>
                    </form>
                </div>
            </div>
        </div>
    )
};