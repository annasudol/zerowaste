import { Dispatch, useReducer } from 'react';
import { RecipeStateProps } from "../utils/types";


// const initialInputsState = {
//     initialState: {
//         title: "",
//         servings: 0,
//         image: "",
//         readyInMinutes: 0,
//         ingredients: [],
//         detailedIngredients: [],
//         instructions: "",
//         sourceUrl: undefined
//     }
// }


type StateType = {
    inputsState: RecipeStateProps
};

export type Action = { TYPE: 'FILL_INPUTS', inputs: RecipeStateProps }


function reducer(state: StateType, action: Action): StateType {
    switch (action.TYPE) {
        case 'FILL_INPUTS':
            return { ...state, inputsState: { ...action.inputs } };
    }
}

export function useRecipeFormState(initialInputsState?: StateType): {
    dispatch: Dispatch<Action>
    inputsState: RecipeStateProps
} {

    // tslint:disable-next-line: no-shadowed-variable
    const [{ inputsState }, dispatch] = useReducer(reducer, {
        inputsState: {
            title: "",
            servings: 0,
            image: "",
            readyInMinutes: 0,
            ingredients: [],
            detailedIngredients: [],
            instructions: "",
            sourceUrl: undefined
        } || initialInputsState
    });

    return { dispatch, inputsState };
}