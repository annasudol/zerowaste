import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Controller, Control } from "react-hook-form";
import products = require("../assets/data/products.json");
import { ListType } from "../UElements/";
const productsTitles = products.reduce((accumulator: any, currentValue: ListType) => {
    return [...accumulator, currentValue.title]
}, []);
interface IngredientSelectProps {
    control: Control<Record<string, any>> | undefined
    detailedIngredients?: boolean
}
export const IngredientSelect: React.FunctionComponent<IngredientSelectProps> = ({ control }): React.ReactElement => {
    return (
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
            onChange={([, data]) => data}
            name="ingredients"
            control={control}
            defaultValue={[productsTitles[35]]}

        />
    )
};
