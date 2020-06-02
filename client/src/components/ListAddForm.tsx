import * as React from "react";
import { TextField } from "@material-ui/core";
import { Button } from "../components"
interface DetailedIngredientSelectProps {
    saveItem(text: string): void
    placeholder?: string
    emptyInput?: boolean

}

export const ListAddForm: React.FunctionComponent<DetailedIngredientSelectProps> = ({ saveItem, placeholder, emptyInput }) => {
    const [item, setItem] = React.useState<string>('');
    return (
        <form
            onSubmit={event => {
                event.preventDefault();
                saveItem(item);
                setItem('');
            }}
            className="mt-1 mb-1"
        >
            <TextField
                variant="outlined"
                placeholder={placeholder}
                onChange={event => {
                    setItem(event.target.value);
                }}
                value={item}
                style={{ minWidth: '300px', marginTop: '10px', width: '100%', boxShadow: emptyInput ? '0px 0px 4px 2px rgba(242,87,87,0.53)' : '' }}
            />
            <Button disabled={item.length < 3} type="submit">Add Ingredient</Button>
        </form>

    );
}