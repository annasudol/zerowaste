import * as React from "react";
import { validate } from "../utils/validators";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import products = require("../assets/data/products.json");
import { ListType, ErrorMessage } from "../components";

const productsTitles = products.reduce((accumulator: any, currentValue: ListType) => {
    return [...accumulator, currentValue.title]
}, []);

interface DetailedIngredientSelectProps {
    onInput: any
    id: string
    placeholder?: string
    list?: string[]
    validation?: boolean
    validators?: any
    label?: string
    errorText?: string
    type: "autocomplete" | "form"


}

export const ListFormInput: React.FunctionComponent<DetailedIngredientSelectProps> = ({ onInput, placeholder, list = [], errorText, validators, validation, label, id, type }) => {
    const [item, setItem] = React.useState<string>('');
    const isValid = React.useMemo(() => {

        if (!validation) {
            if (list.length > 0) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }

    }, [list, validation])

    if (type === "autocomplete") {
        return (
            <>
                {!isValid && errorText && <ErrorMessage validationMessage={errorText || "An error occurred"} />}
                <Autocomplete
                    multiple
                    className="mt-4 mb-4"
                    style={{ boxShadow: !isValid ? '0px 0px 4px 2px rgba(242,87,87,0.53)' : '' }}
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
                            label={placeholder || "Search for products in the recipe"}
                            variant="outlined"
                        />
                    )}
                    onChange={(event, value: string[], reason): void => onInput(value)}
                    value={list || []}
                />
            </>
        )
    }

    return (
        <div className={`form-control ${!isValid && 'form-control--invalid'}`}>
            {!isValid && <ErrorMessage validationMessage={errorText || "An error occurred"} />}

            <label htmlFor={id} className="text-sm text-lightGreen uppercase">{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                onChange={event => {
                    const value = event.target.value;
                    setItem(value);
                }}
                value={item}
            />
            <button className="bg-green hover:bg-green text-white font-bold py-2 px-4 rounded outline-none m-1 border-0" disabled={item.length < 3} onClick={event => {
                event.preventDefault();
                if (validate(item, validators)) {
                    onInput(item)
                    setItem('')
                }

            }}>Add Ingredient</button>
        </div>

    );
}