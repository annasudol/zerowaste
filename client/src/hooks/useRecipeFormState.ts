import { Dispatch, useReducer } from 'react';


type StateType = {
    title: string
    servings: number
    ingredients: string[]
    readyInMinutes: number
    sourceUrl: undefined | string
    instructions: string
};

export type Action = { TYPE: 'ADD_TITLE', setTitle: string } | { TYPE: 'ADD_SERVINGS', setServings: number } | { TYPE: 'ADD_INGREDIENTS', setIngredients: string[] } | { TYPE: 'ADD_READY_IN_MINUTES', setMinutes: number } | { TYPE: 'ADD_SOURCE_URL', setUrl: string | undefined } | { TYPE: 'ADD_INSTRUCTIONS', setInstructions: string }

export const initialState = { title: '', servings: 0, ingredients: [], readyInMinutes: 0, sourceUrl: undefined, instructions: '' };

function reducer(state: StateType, action: Action): StateType {
    switch (action.TYPE) {
        case 'ADD_TITLE':
            return { ...state, title: action.setTitle };
        case 'ADD_SERVINGS':
            return { ...state, servings: action.setServings };
        case 'ADD_INGREDIENTS':
            return { ...state, ingredients: action.setIngredients };
        case 'ADD_READY_IN_MINUTES':
            return { ...state, readyInMinutes: action.setMinutes };
        case 'ADD_SOURCE_URL':
            return { ...state, sourceUrl: action.setUrl };
        case 'ADD_INSTRUCTIONS':
            return { ...state, instructions: action.setInstructions };
    }
}
// type ingredientsState string[]
// tslint:disable-next-line: no-shadowed-variable
export function useRecipeFormState(startState?: StateType): {
    dispatch: Dispatch<Action>;
    title: string
    servings: number
    ingredients: string[]
    readyInMinutes: number
    sourceUrl: undefined | string
    instructions: string
} {

    const [{ title, servings, ingredients, instructions, readyInMinutes, sourceUrl }, dispatch] =
        useReducer(reducer, startState ? startState : initialState);

    return { dispatch, title, servings, ingredients, readyInMinutes, sourceUrl, instructions };
}
