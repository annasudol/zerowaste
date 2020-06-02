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

export interface LocationFormTypes {
    hash?: string
    pathname: string
    search?: string
    state: RecipeProps
    key?: string
}


interface RecipeProps {
    id: string
    title: string
    servings: number
    instructions: string
    image: string
    readyInMinutes: number
    ingredients: string[]
    detailedIngredients: string[]
    sourceUrl?: string
}
