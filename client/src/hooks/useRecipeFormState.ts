import { Dispatch, useReducer } from 'react';
import { useSelector } from "react-redux";


type StateType = {
    title: string
    ingredients: string[]
    readyInMinutes: number
    sourceUrl: string
};

export type Action = { TYPE: 'ADD_TITLE', setTitle: string } | { TYPE: 'ADD_INGREDIENTS', setIngredients: string[] } | { TYPE: 'ADD_READY_IN_MINUTES', setMinutes: number } | { TYPE: 'ADD_SOURCE_URL', setUrl: string }

export const initialState = { title: '', ingredients: [], readyInMinutes: 0, sourceUrl: '' };

function reducer(state: StateType, action: Action): StateType {
    switch (action.TYPE) {
        case 'ADD_TITLE':
            return { ...state, title: action.setTitle };
        case 'ADD_INGREDIENTS':
            return { ...state, ingredients: action.setIngredients };
        case 'ADD_READY_IN_MINUTES':
            return { ...state, readyInMinutes: action.setMinutes };
        case 'ADD_SOURCE_URL':
            return { ...state, sourceUrl: action.setUrl };
    }
}

export function useRecipeFormState(ingredientsState?: string[]): {
    dispatch: Dispatch<Action>;
    title: string
    ingredients: string[] | []
    readyInMinutes: number
    sourceUrl: string
} {

    const [{ title, ingredients, readyInMinutes, sourceUrl }, dispatch] = useReducer(reducer, ingredientsState ? { title: '', ingredients: ingredientsState, readyInMinutes: 0, sourceUrl: '' } : initialState);

    return { dispatch, title, ingredients, readyInMinutes, sourceUrl };
}
