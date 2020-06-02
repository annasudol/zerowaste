import * as React from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import products = require("../assets/data/products.json");
import { ListType } from "../components";
import { Action } from "../hooks";

const productsTitles = products.reduce((accumulator: any, currentValue: ListType) => {
    return [...accumulator, currentValue.title]
}, []);

export interface AutocompleteIngredientsProps {
    dispatch: React.Dispatch<Action>
    ingredients: string[] | []
    placeholder?: string
}

export const AutocompleteIngredients: React.FunctionComponent<AutocompleteIngredientsProps> = ({ dispatch, ingredients, placeholder = "Search for products in the recipe" }) => {

    return (
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
                    label={placeholder}
                    variant="outlined"
                />
            )}
            onChange={(event, value: string[], reason): void => dispatch({ TYPE: 'ADD_INGREDIENTS', setIngredients: value })}
            value={ingredients}
        />

    )
}