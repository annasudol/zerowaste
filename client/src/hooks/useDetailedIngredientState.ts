import { useState } from 'react';

export const useDetailedIngredientState = () => {
    const [detailedIngredients, setDetailedIngredients] = useState<string[] | []>([]);

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
