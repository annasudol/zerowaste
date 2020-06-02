import { initialState } from '../hooks/useRecipeFormState';
export interface LocationTypes {
    hash?: string
    pathname: string
    search?: string
    state: {
        ingredients?: string[]
        backPath?: string
    };
    key?: string
}

