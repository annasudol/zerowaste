import { useState } from 'react';

export const useDetailedIngredientState = (initialState?: string[]) => {
    const [detailedIngredients, setDetailedIngredients] = useState<string[] | []>(initialState ? initialState : []);

    return {
        detailedIngredients,
        addDetailedIngredient: (text: string) => {
            setDetailedIngredients([...detailedIngredients, text]);
        },
        deleteDetailedIngredient: ingredientIndex => {
            const newIngredient = detailedIngredients.filter((_, index) => index !== ingredientIndex);
            setDetailedIngredients(newIngredient);
        }
    };
};
