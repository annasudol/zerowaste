const { users, recipes } = require('./datasources/database');
const { v4: uuidv4 } = require('uuid')
module.exports = {
  Query: {
    recipes: async (_, { ingredients }, { dataSources }) => {
      const recipesDB = recipes.filter(recipe => {
        const ingredientsDB = recipe.ingredients;
        const results = ingredientsDB.filter(ingredientDB => ingredients.some(ingredient => ingredient === ingredientDB));
        return results.length > 0 && recipe;
      });

      const allRecipes = await dataSources.dataAPI.getAllRecipes(ingredients);
      return [...recipesDB, ...allRecipes];
    },
    recipeDetails: (_, { id }, { dataSources }) => {
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
  },
  Mutation: {
    createRecipe: (parent, args, info) => {
      const id = uuidv4();

      const recipe = {
        id: uuidv4(),
        ...args
      }
      recipes.push(recipe)
      return recipe
    }
  }
};