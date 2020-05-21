const { users, recipes } = require('./datasources/database');

module.exports = {
  Query: {
    recipes: async (_, { ingredients }, { dataSources }) => {
      const recipesDB = recipes.filter(recipe => ![...ingredients].includes(recipe.ingredients));
      const allRecipes = await dataSources.dataAPI.getAllRecipes(ingredients);
      return [...recipesDB, ...allRecipes];
    },
    recipe: (_, { id }, { dataSources }) => {
      const recipeFromDb = recipes.find(recipe => recipe.id === id);
      return recipeFromDb ? recipeFromDb : dataSources.dataAPI.getRecipeDetails(id)
    },
    recipeInfo: (_, { id }, { dataSources }) => {
      const recipeFromDb = recipes.find(recipe => recipe.id === id);
      return recipeFromDb
    },
    user: (_, { id }, { dataSources }) => {
      const user = users.find(user => user.id === id);
      return user;
    },

  },

  User: {
    recipes: (parent, args, info) => {
      return recipes.filter(recipe => recipe.authorId === parent.id)
    }
  },
  Recipe: {
    user: (parent, args, info) => {
      return users.find(user => user.id === parent.authorId)
    }
  }
};