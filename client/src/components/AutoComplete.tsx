import * as React from "react";
import { products } from "../assets/data/products";
import { ListType } from "../utils/types";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
const productsTitles = products.reduce((accumulator: any, currentValue: ListType) => {
    return [...accumulator, currentValue.title]
}, []);

interface AutoCompleteProps {
    placeholder?: string
    saveList(value: string[]): void
    form?(ingredients: string[]): void
    list?: string[] | []
    error?: boolean
}

export const AutoComplete: React.FunctionComponent<AutoCompleteProps> = ({ placeholder, form, saveList, list, error }) => {

    const handleChange = (value: string[]) => {
        if (form) {
            form(value)
        }
        saveList(value);
    }

    return (
        <Autocomplete
            multiple
            className="mt-4 mb-4"
            style={{
                border: error ? '1px solid red' : ''
            }}
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
            onChange={(event, value: string[], reason): void => handleChange(value)}
            value={list}
        />
    )

}