import { Dispatch, useReducer } from 'react';
import { RecipeStateProps } from "../utils/types";

type StateType = {
    inputsState: RecipeStateProps
};

export type Action = { TYPE: 'FILL_INPUTS', setInputs: StateType }
export const initialState = { inputsState: { title: '', servings: 0, ingredients: [], readyInMinutes: 0, sourceUrl: undefined, instructions: '' } };

function reducer(state: StateType, action: Action): RecipeStateProps {
    switch (action.TYPE) {
        case 'FILL_INPUTS':
            return { ...state, inputsState: { ...action.setInputs } };

    }
}
// type ingredientsState string[]
// tslint:disable-next-line: no-shadowed-variable
export function useRecipeFormState(startState?: StateType): {
    dispatch: Dispatch<Action>;
    inp
} {

    const [{ title, servings, ingredients, instructions, readyInMinutes, sourceUrl }, dispatch] = useReducer(reducer, initialState);

    return { dispatch, title, servings, ingredients, readyInMinutes, sourceUrl, instructions };
}

// import { useCallback, useReducer } from 'react';
// import { RecipeStateProps } from "../utils/types";


// export type Action = { type: 'FILL_INPUTS', inputs: RecipeStateProps };

// const formReducer = (state: RecipeStateProps, action: Action) => {
//    if(action.type === 'FILL_INPUTS') {
//     return { ...state, action.inputs };
//    }
// };

// export function useForm(initialInputs: RecipeStateProps): {
//     formState: any
//     inputHandler: any
// } {
//     const [formState, dispatch] = useReducer(formReducer, initialInputs);

//     const inputHandler = useCallback((value: { values: RecipeStateProps}) => {
//         dispatch({
//             type: 'FILL_INPUTS',
//             inputs: value.values,
//         });
//     }, []);


//     return {
//         formState,
//         inputHandler,
//     }
// };