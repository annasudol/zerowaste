import * as React from "react";
import { useForm, Controller } from "react-hook-form";

import { makeStyles, TextField } from "@material-ui/core";
import { ListType, Button, IngredientSelect } from "../UElements";
import { DetailedIngredientsList } from '../components'
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useDetailedIngredientState } from "../hooks/useDetailedIngredientState";
import { DetailedIngredientSelect } from "../UElements/DetailedIngredientSelect";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '500',
        '& > * + *': {
            marginTop: theme.spacing(3),
        }
    },
}));

type Inputs = {
    title: string;
    ingredients: string[] | [];
    detailedIngredients: string[] | [];
}

const defaultValues = {
    title: '',
    ingredients: [],
    detailedIngredients: ['dog', 'cat'],
}


export const RecipeForm: React.FunctionComponent = (): React.ReactElement => {
    const [data, setData] = React.useState(null);
    const { handleSubmit, register, reset, control } = useForm<Inputs>({ defaultValues });
    const { ingredientList, addIngredient, deleteIngredient } = useDetailedIngredientState();

    console.log(data)
    return (

        <div className="content overflow-hidden flex justify-center items-center">

            <div className="flex flex-col w-1/2 recipe-form">
                <h1 className="form-header font-bebas uppercase text-darkGray text-center pb-0 m-0">Add Recipe</h1>

                <form onSubmit={handleSubmit((data: any) => setData(data))}>
                    <input name="title" type="text" placeholder="Title" ref={register({ required: true })} />
                    <IngredientSelect control={control} />
                    <DetailedIngredientSelect saveIngredient={(text: string) => {
                        const trimmedText = text.trim();

                        if (trimmedText.length > 0) {
                            addIngredient(trimmedText);
                        }
                    }} />
                    <DetailedIngredientsList ingredients={ingredientList} deleteIngredient={(index: number): any => deleteIngredient(index)} />

                    <input type="submit" title="Submit" className="bg-green hover:bg-green text-white font-bold py-2 px-4 rounded outline-none m-1 border-0" />
                </form>
            </div>
        </div>
    )
};


