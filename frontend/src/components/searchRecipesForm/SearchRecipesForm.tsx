import React, { FC, ReactElement } from 'react';

import { AppRoutes } from '../../routes'
    ;
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProductsList } from '../../state/products/actions'
import { AutoComplete } from '..'
import { getProducts } from '../../state/products/selectors';
import { Button } from 'antd';


export const SearchRecipesForm: FC<{ btnText?: string }> = ({ btnText = 'Search Recipes' }): ReactElement => {
    const ingredientsState = useSelector(getProducts);
    const [ingredients, setIngredients] = React.useState<string[] | []>(ingredientsState)
    const history = useHistory();
    const dispatchReduxAction = useDispatch();
    const searchRecipes = (): void => {
        dispatchReduxAction(createProductsList(ingredients))
        return history.push({ pathname: AppRoutes.RecipesList });
    }
    return (<>
        <AutoComplete list={ingredients} saveList={(value: string[]): void => setIngredients(value)} />
        {ingredients.length > 0 && <Button type='primary' onClick={searchRecipes}>{btnText}</Button>}
    </>
    )
}


