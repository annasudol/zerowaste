import * as React from "react";
import { TextField, makeStyles } from "@material-ui/core";
import { Button } from '.'
interface DetailedIngredientSelectProps {
    saveItem(text: string): void
    placeholder: string
    textarea?: boolean
}
export const ListAddForm: React.FunctionComponent<DetailedIngredientSelectProps> = ({ saveItem, placeholder, textarea }) => {
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
            {textarea ? (<><textarea placeholder={placeholder}
                onChange={event => {
                    setItem(event.target.value);
                }}
                value={item}
                style={{ minWidth: '300px', marginTop: '5px', width: '100%', minHeight: '100px', padding: '10px' }} />
                <button onSubmit={event => {
                    event.preventDefault();
                    saveItem(item);
                    setItem('');
                }} disabled={item.length === 0} className="bg-coral hover:bg-coral text-white font-bold py-2 px-4 rounded outline-none m-1 border-0"> add step</button>
            </>
            ) : <TextField
                    variant="outlined"
                    placeholder={placeholder}
                    onChange={event => {
                        setItem(event.target.value);
                    }}
                    value={item}
                    style={{ minWidth: '300px', marginTop: '10px', width: '100%' }}
                />}
        </form>

    );
}