import { useState } from 'react';

export const useDetailedIngredientState = () => {
    const [ingredientList, setIngredientList] = useState<string[] | []>(['1 tbsp olive oil', '1 onion diced']);

    return {
        ingredientList,
        addIngredient: (text: string) => {
            setIngredientList([...ingredientList, text]);
        },
        deleteIngredient: ingredientIndex => {
            const newIngredient = ingredientList.filter((_, index) => index !== ingredientIndex);
            setIngredientList(newIngredient);
        }
    };
};
