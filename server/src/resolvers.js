const { paginateResults } = require('./utils');

module.exports = {
  Query: {
    recipes: async (_, { ingredients, numberOfResults = 30, pageSize = 20, page }, { dataSources }) => {
      const allRecipes = await dataSources.dataAPI.getAllLaunches(ingredients, numberOfResults);

      const recipes = paginateResults({
        page,
        pageSize,
        results: allRecipes
      });

      return recipes
    },
    recipeDetails: (_, { id }, { dataSources }) => dataSources.dataAPI.getRecipeDetails(id),
  }
};