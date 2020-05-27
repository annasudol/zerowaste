const { RESTDataSource } = require('apollo-datasource-rest');
const app_key = 'd7b7dba12474485bac9f370e6f1e378a';

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
        const detailedIngredients = recipe.extendedIngredients?.map(ingredient => ingredient.originalString);
        return {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            readyInMinutes: recipe.readyInMinutes,
            detailedIngredients,
            author: recipe.sourceName,
            sourceUrl: recipe.sourceUrl
        };
    }

    async getAllRecipes(query, numberOfResults = 30) {
        const responses = await this.get('findByIngredients', { ingredients: query.join(',+'), apiKey: app_key, numberOfResults });
        return Array.isArray(responses)
            ? responses.map(response => this.basicRecipeReducer(response))
            : [];
    }
    async getRecipeDetails(id) {
        const response = await this.get(`${id}/information?includeNutrition=false&apiKey=${app_key}`);
        return this.detailedRecipeReducer(response)
    }

}

module.exports = DataAPI;