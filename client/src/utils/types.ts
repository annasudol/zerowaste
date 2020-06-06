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



export interface ListType {
    title: string
    id: number
}


export interface RecipeStateProps {
    title: string
    servings: number
    image: string
    readyInMinutes: number
    ingredients: string[] | []
    detailedIngredients: string[] | []
    instructions: string
    sourceUrl: undefined | string
}