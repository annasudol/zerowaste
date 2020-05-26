import * as React from "react";
import { AppRoutes } from "../../routes";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProductsList } from '../state/products/actions'
import { AutocompleteIngredients, Button } from '../components'
import { useRecipeFormState } from "../hooks";
import { getProducts } from "../state/products/selectors";



export interface ListType {
    title: string
    id: number
}

export const SearchRecipesForm: React.FunctionComponent<{ btnText?: string }> = ({ btnText = 'Search Recipes' }) => {
    const ingredientsState = useSelector(getProducts);
    const history = useHistory();
    const dispatchReduxAction = useDispatch();
    const { ingredients, dispatch } = useRecipeFormState(ingredientsState);

    const searchRecipes = (): void => {
        dispatchReduxAction(createProductsList(ingredients))
        return history.push({ pathname: AppRoutes.RecipesList });
    }


    return (<>
        <AutocompleteIngredients dispatch={dispatch} ingredients={ingredients} placeholder="Search for products in recipes" />
        {ingredients.length === 0 ? <p>Add at least one product</p> : <Button onClick={searchRecipes}>{btnText}</Button>}
    </>
    )
}