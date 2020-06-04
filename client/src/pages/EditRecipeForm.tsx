import * as React from "react";
import { useLocation, useHistory } from 'react-router';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Redirect } from "react-router";
import BackspaceIcon from '@material-ui/icons/Backspace';
import { Button, Input, ListFormInput, List } from "../components";
import { VALIDATOR_MINLENGTH, VALIDATOR_MIN, VALIDATOR_URL } from "../utils/validators";
import { useForm } from "../hooks/useForm";
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

interface RecipeProps {
    id: string
    title: string
    servings: number
    instructions: string
    image: string
    readyInMinutes: number
    ingredients: string[]
    detailedIngredients: string[]
    sourceUrl?: string
}
interface EditRecipeFormProps {
    initialState: RecipeProps
}

export const EditRecipeForm: React.FunctionComponent = (): React.ReactElement | any => {
    const location: LocationTypes = useLocation();
    const initialState = location.state;
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
    const { title, servings, image, readyInMinutes, ingredients, detailedIngredients, instructions } = formState;
    const emptyState = title === "" || servings === 0 || image === "" || readyInMinutes === 0 || ingredients === [] || detailedIngredients === [] || instructions === ""
    const [updateRecipe, { data, error, loading }] = useMutation(UPDATE_RECIPE);

    const handleSubmit = (event: any): any => {
        event.preventDefault();
        if (emptyState) {
            setValidation(false)
        } else {
            setValidation(true)
            console.log(title, servings, image, readyInMinutes, ingredients, detailedIngredients, instructions, "title, servings, image, readyInMinutes, ingredients, detailedIngredients, instructions")
            updateRecipe({ variables: { id: initialState.id, title, servings, image: "https://spoonacular.com/recipeImages/543832-556x370.jpg", readyInMinutes, ingredients, detailedIngredients, instructions, sourceUrl } });
        }

    }


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
                    <form onSubmit={(e): any => handleSubmit(e)}>
                        <Input id="title" onInput={inputHandler} type="text" initialValue={initialState.title} validation={validation} validators={[VALIDATOR_MINLENGTH(3)]} errorText="Title input is required" label="Title" />
                        <Input id="servings" onInput={setServings} type="number" initialValue={initialState.servings} validation={validation} validators={[VALIDATOR_MIN(1)]} errorText="Add servings value min. 1" label="Servings" />
                        <Input id="readyInMinutes" onInput={setReadyInMinutes} type="number" initialValue={initialState.readyInMinutes} validation={validation} validators={[VALIDATOR_MIN(5)]} errorText="Add preparation time, min. 5 min" label="Ready In Minutes" />
                        <ListFormInput id="ingredients" onInput={setIngredients} list={initialState.ingredients || formState.ingredients} validation={validation} type="autocomplete" errorText="Add ingredients to make the recipe searchable" />
                        <ListFormInput id="detailedIngredients" onInput={setDetailedIngredients} list={initialState.detailedIngredients || formState.detailedIngredients} validation={validation} validators={[VALIDATOR_MINLENGTH(3)]} type="form" errorText="Add detailed ingredients eg: 1 tbsp olive oil" label="Detailed Ingridient" />
                        <List list={initialState.detailedIngredients || formState.detailedIngredients} deleteItem={(index: number): any => deleteDetailedIngredients(index)} />
                        <Input id="instructions" onInput={setInstructions} type="text" initialValue={initialState.instructions} validation={validation} validators={[VALIDATOR_MINLENGTH(10)]} errorText="Add detailed instructions, min. 10 characters" label="Instructions" />
                        <Button type="submit">Send Recipe</Button>
                    </form>
                </div>
            </div>
        </div>
    )
};