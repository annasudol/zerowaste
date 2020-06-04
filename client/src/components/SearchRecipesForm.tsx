import * as React from "react";
import { AppRoutes } from "../../routes";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProductsList } from '../state/products/actions'
import { ListFormInput, Button } from '../components'
import { getProducts } from "../state/products/selectors";
import { useForm } from "../hooks/useForm";

export interface ListType {
    title: string
    id: number
}

export const SearchRecipesForm: React.FunctionComponent<{ btnText?: string }> = ({ btnText = 'Search Recipes' }) => {
    const ingredients = useSelector(getProducts);
    const history = useHistory();
    const dispatchReduxAction = useDispatch();
    const { formState, setIngredients } = useForm({ ingredients });
    const searchRecipes = (): void => {
        dispatchReduxAction(createProductsList(ingredients))
        return history.push({ pathname: AppRoutes.RecipesList });
    }


    return (<>
        <ListFormInput id="ingredients" onInput={setIngredients} list={formState.ingredients} type="autocomplete" />
        {ingredients.length === 0 ? <p>Add at least one product</p> : <Button onClick={searchRecipes}>{btnText}</Button>}
    </>
    )
}

