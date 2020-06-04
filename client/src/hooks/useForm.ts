import { useCallback, useReducer } from 'react';

export interface StateFormType {
    title?: string
    servings?: number
    image?: string
    readyInMinutes?: number
    ingredients?: string[] | []
    detailedIngredients?: string[] | []
    instructions?: string
    sourceUrl?: string
};

export type Action =
    { type: 'ADD_TITLE', inputs: string } |
    { type: 'ADD_SERVINGS', inputs: string } |
    { type: 'ADD_IMAGE', inputs: string } |
    { type: 'ADD_READY_IN_MINUTES', inputs: number } |
    { type: 'ADD_INGREDIENTS', inputs: string[] } |
    { type: 'ADD_DETAILED_INGREDIENT', inputs: string } |
    { type: 'DELETE_DETAILED_INGREDIENT', inputs: number } |
    { type: 'ADD_INSTRUCTIONS', inputs: string } |
    { type: 'ADD_SOURCE_URL', inputs: string | undefined }


const formReducer = (state: StateFormType, action: Action) => {
    switch (action.type) {
        case 'ADD_TITLE':
            return { ...state, title: action.inputs };
        case 'ADD_SERVINGS':
            return { ...state, servings: action.inputs };
        case 'ADD_IMAGE':
            return { ...state, image: action.inputs };
        case 'ADD_INGREDIENTS':
            return { ...state, ingredients: action.inputs };
        case 'ADD_DETAILED_INGREDIENT':
            return { ...state, detailedIngredients: state.detailedIngredients ? [...state.detailedIngredients, action.inputs] : [] };
        case 'DELETE_DETAILED_INGREDIENT':
            return { ...state, detailedIngredients: state.detailedIngredients ? state.detailedIngredients.splice(action.inputs, 1) : [] };
        case 'ADD_READY_IN_MINUTES':
            return { ...state, readyInMinutes: action.inputs };
        case 'ADD_INSTRUCTIONS':
            return { ...state, instructions: action.inputs };
        case 'ADD_SOURCE_URL':
            return { ...state, sourceUrl: action.inputs };
        default:
            return state;
    }
};

export function useForm(initialInputs: StateFormType): {
    formState: StateFormType
    inputHandler: any
    setServings: any
    setImage: any
    setIngredients: any
    setDetailedIngredients: any
    deleteDetailedIngredients: any
    setReadyInMinutes: any
    setInstructions: any
    setSourceUrl: any
} {
    const [formState, dispatch] = useReducer(formReducer, initialInputs);

    const inputHandler = useCallback((value: string) => {
        dispatch({
            type: 'ADD_TITLE',
            inputs: value,
        });
    }, []);

    const setServings = useCallback((value: string) => {

        dispatch({
            type: 'ADD_SERVINGS',
            inputs: value,
        });
    }, []);

    const setImage = useCallback((image: string) => {
        dispatch({
            type: 'ADD_IMAGE',
            inputs: image,
        });
    }, []);

    const setIngredients = useCallback((value: string[]) => {
        dispatch({
            type: 'ADD_INGREDIENTS',
            inputs: value,
        });
    }, []);

    const setDetailedIngredients = useCallback((value: string) => {
        dispatch({
            type: 'ADD_DETAILED_INGREDIENT',
            inputs: value,
        });
    }, []);

    const deleteDetailedIngredients = useCallback((value: number) => {
        dispatch({
            type: 'DELETE_DETAILED_INGREDIENT',
            inputs: value,
        });
    }, []);

    const setReadyInMinutes = useCallback((value: number) => {
        dispatch({
            type: 'ADD_READY_IN_MINUTES',
            inputs: value,
        });
    }, []);

    const setInstructions = useCallback((value: string) => {
        dispatch({
            type: 'ADD_INSTRUCTIONS',
            inputs: value,
        });
    }, []);

    const setSourceUrl = useCallback((value) => {
        dispatch({
            type: 'ADD_SOURCE_URL',
            inputs: value,
        });
    }, []);

    return {
        formState,
        inputHandler,
        setServings,
        setImage,
        setIngredients,
        setDetailedIngredients,
        deleteDetailedIngredients,
        setReadyInMinutes,
        setInstructions,
        setSourceUrl
    }
};