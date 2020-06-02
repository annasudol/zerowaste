import * as React from "react";
import { List, ErrorMessage, ListAddForm, AutocompleteIngredients, LoadingBar, Button } from '../components'
import { useDetailedIngredientState, useRecipeFormState } from "../hooks";
import { useHistory, useLocation } from 'react-router';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { isUrlValid } from "../utils/validUrl";
import { Redirect } from "react-router";
import cx from 'classnames';
import BackspaceIcon from '@material-ui/icons/Backspace';
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
    const initialState = location.state
    const { detailedIngredients, addDetailedIngredient, deleteDetailedIngredient } = useDetailedIngredientState(initialState.detailedIngredients);
    const { title, instructions, servings, ingredients, readyInMinutes, sourceUrl, dispatch } = useRecipeFormState({ title: initialState.title, servings: initialState.servings, ingredients: initialState.ingredients, readyInMinutes: initialState.readyInMinutes, sourceUrl: initialState.sourceUrl, instructions: initialState.instructions });
    const [emptyInput, setEmptyInput] = React.useState<boolean>(false);
    const [updateRecipe, { data, error, loading }] = useMutation(UPDATE_RECIPE);

    const history = useHistory();


    const handleSubmit = (event: any): any => {
        event.preventDefault();
        if (title === "" || readyInMinutes === 0 || ingredients.length === 0 || detailedIngredients.length === 0 || instructions.length === 0) {
            setEmptyInput(true)
        } else {
            setEmptyInput(false)
            updateRecipe({ variables: { id: initialState.id, title, servings, image: "https://spoonacular.com/recipeImages/543832-556x370.jpg", readyInMinutes, ingredients, detailedIngredients, instructions, sourceUrl } });

        }
    }

    if (loading) return <LoadingBar />
    if (error) {
        return (<ErrorMessage message={`ERROR: ${error.message}`}></ErrorMessage>)
    }
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
                        {emptyInput && title === '' && <ErrorMessage validationMessage='Add title' />}
                        <label className="text-sm text-lightGreen uppercase">Title
                    <input className={cx(emptyInput && title === '' && "inputError")} name="title" type="text" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => dispatch({ TYPE: 'ADD_TITLE', setTitle: e.target.value })} />
                        </label>
                        {emptyInput && servings === 0 && <ErrorMessage validationMessage='Add servings' />}
                        <label className="text-sm text-lightGreen uppercase">Servings
                    <input className={cx(emptyInput && title === '' ? "inputError mt-2 mb-2" : "mt-2 mb-2")} name="servings" type="number" placeholder="Servings" value={servings}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                    const val = parseInt(e.target.value, 10);
                                    if (val > 0) dispatch({ TYPE: 'ADD_SERVINGS', setServings: val })
                                }} />
                        </label>
                        {emptyInput && readyInMinutes === 0 && <ErrorMessage validationMessage='Add preparation time' />}
                        <label className="text-sm text-lightGreen uppercase">Ready In Minutes
                    <input className={cx(emptyInput && readyInMinutes === 0 ? "inputError mt-2 mb-2" : "mt-2 mb-2")} name="readyInMinutes" type="number" value={readyInMinutes}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                    const val = parseInt(e.target.value, 10);
                                    if (val > 0) dispatch({ TYPE: 'ADD_READY_IN_MINUTES', setMinutes: val })
                                }} />
                        </label>
                        {emptyInput && ingredients.length === 0 && <ErrorMessage validationMessage='Add ingredients to make the recipe searchable' />}
                        <AutocompleteIngredients dispatch={dispatch} ingredients={ingredients} emptyInput={emptyInput && ingredients.length === 0} />

                        {emptyInput && detailedIngredients.length === 0 && <ErrorMessage validationMessage='Add detailed ingredients eg: 1 tbsp olive oil' />}
                        <label className="text-sm text-lightGreen uppercase">Detailed ingredient
                    <ListAddForm saveItem={(text: string) => {
                                const trimmedText = text.trim();
                                if (trimmedText.length > 0) {
                                    addDetailedIngredient(trimmedText);
                                }
                            }}
                                emptyInput={emptyInput && detailedIngredients.length === 0}

                            />
                        </label>
                        <List list={detailedIngredients} deleteItem={(index: number): any => deleteDetailedIngredient(index)} />
                        {emptyInput && instructions.length === 0 && <ErrorMessage validationMessage='Add detailed instructions' />}

                        <label className="text-sm text-lightGreen uppercase">Instructions
                    <textarea className={cx(emptyInput && instructions.length === 0 && "inputError")} name="instructions" value={instructions} onChange={(e: any): void => {
                                const text = e.target.value
                                if (text.length > 0) dispatch({ TYPE: 'ADD_INSTRUCTIONS', setInstructions: text })
                            }}></textarea>
                        </label>

                        <label className="text-sm text-lightGreen uppercase">Source Url
                    <input name="sourceUrl" type="text" placeholder="Source Url" value={sourceUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                isUrlValid(e.target.value) ? dispatch({ TYPE: 'ADD_SOURCE_URL', setUrl: e.target.value }) : dispatch({ TYPE: 'ADD_SOURCE_URL', setUrl: undefined })
                            }} />
                        </label>
                        <Button type="submit">Send Recipe</Button>
                    </form>
                </div>
            </div>
        </div >
    )
};
