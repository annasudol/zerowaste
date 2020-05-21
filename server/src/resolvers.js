const { users, recipes } = require('./datasources/database');

module.exports = {
  Query: {
    recipes: async (_, { ingredients }, { dataSources }) => {
      const recipesDB = recipes.filter(recipe => ![...ingredients].includes(recipe.ingredients));
      console.log(recipesDB, ingredients, "recipesDB")
      const allRecipes = await dataSources.dataAPI.getAllRecipes(ingredients);
      return [...recipesDB, ...allRecipes];
    },
    recipeDetails: (_, { id }, { dataSources }) => {
      const recipeFromDb = recipes.find(recipe => recipe.id === id);
      return recipeFromDb ? recipeFromDb : dataSources.dataAPI.getRecipeDetails(id)
    },

  },
  Recipe: {
    user: (parent, args, info) => {
      console.log(parent, args, info)
      return users.find(user => user.id === userId)
    }
  },

  // User: {
  //   recipe: (parent, args, info) => {
  //     console.log(parent)
  //     return recipes.find(recipe => recipe.id === id)
  //   }
  // }

};