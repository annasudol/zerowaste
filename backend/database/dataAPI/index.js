const { RESTDataSource } = require('apollo-datasource-rest');

class DataAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.spoonacular.com/recipes/';
    }

    basicRecipeReducer(recipe) {
        const ingredients = [...recipe.usedIngredients.map(ingredient => ingredient.name), ...recipe.missedIngredients.map(ingredient => ingredient.name)];

        return {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            ingredients,
        };
    }
    detailedRecipeReducer(recipe) {
        const detailedIngredients = recipe.extendedIngredients.map(ingredient => ingredient.originalString);
        return {
            id: recipe.id,
            servings: recipe.servings,
            title: recipe.title,
            image: recipe.image,
            detailedIngredients,
            readyInMinutes: recipe.readyInMinutes,
            instructions: recipe.instructions,
            author: recipe.sourceName,
            sourceUrl: recipe.sourceUrl
        };
    }

    async getAllRecipes(query) {
        const responses = await this.get('findByIngredients', { ingredients: query.join(',+'), apiKey: process.env.API_KEY });
        return Array.isArray(responses)
            ? responses.map(response => this.basicRecipeReducer(response))
            : [];
    }
    async getRecipeDetails(id) {
        const response = await this.get(`${id}/information?includeNutrition=false&apiKey=${process.env.API_KEY}`);

        return this.detailedRecipeReducer(response)
    }

}

module.exports = DataAPI;