module.exports = {
  Query: {
    recipes: async (_, { ingredients }, { dataSources }) => {
      const allRecipes = await dataSources.dataAPI.getAllRecipes(ingredients);
      return allRecipes
    },
    recipeDetails: (_, { id }, { dataSources }) => dataSources.dataAPI.getRecipeDetails(id),
  }
};