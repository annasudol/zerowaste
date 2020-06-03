import * as React from "react";
import { Button } from "../components"
interface DetailedIngredientSelectProps {
    saveItem(text: string): void
    placeholder?: string
    emptyInput?: boolean

}

export const ListAddForm: React.FunctionComponent<DetailedIngredientSelectProps> = ({ saveItem, placeholder, emptyInput }) => {
    const [item, setItem] = React.useState<string>('');
    return (
        <>
            <input
                placeholder={placeholder}
                onChange={event => {
                    setItem(event.target.value);
                }}
                value={item}
                style={{ minWidth: '300px', marginTop: '10px', width: '100%', boxShadow: emptyInput ? '0px 0px 4px 2px rgba(242,87,87,0.53)' : '' }}
            />
            <button className="bg-green hover:bg-green text-white font-bold py-2 px-4 rounded outline-none m-1 border-0" disabled={item.length < 3} onClick={event => {
                event.preventDefault();
                saveItem(item);
                setItem('');
            }}>Add Ingredient</button>
        </>

    );
}