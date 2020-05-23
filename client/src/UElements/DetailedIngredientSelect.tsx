import * as React from "react";
import { TextField } from "@material-ui/core";
interface DetailedIngredientSelectProps {
    saveIngredient(detailedIngredient: string): void
}
export const DetailedIngredientSelect: React.FunctionComponent<DetailedIngredientSelectProps> = ({ saveIngredient }) => {
    const [detailedIngredient, setDetailedIngredient] = React.useState<string>('');

    return (
        <div>
            <form
                onSubmit={event => {
                    event.preventDefault();
                    saveIngredient(detailedIngredient);
                    setDetailedIngredient('');

                }}
            >
                <TextField
                    variant="outlined"
                    placeholder="Add detailed ingredients"
                    onChange={event => {
                        setDetailedIngredient(event.target.value);
                    }}
                    value={detailedIngredient}
                    style={{ minWidth: '200px' }}
                />
            </form>
        </div >
    );
}