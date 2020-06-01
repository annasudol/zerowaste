const { combineResolvers } = require('graphql-resolvers');

const Recipe = require('../database/models/recipe');
const User = require('../database/models/user');
const { isAuthenticated, isRecipeOwner } = require('./middleware');
const { dataToString, paginateResults } = require('../helper');

module.exports = {
  Query: {
    recipes: async (_, { ingredients }, { dataSources }) => {
      try {
        const recipesDB = await Recipe.find({});
        const filteredRecipesDB = await recipesDB.filter(recipe => {
          const ingredientsDB = recipe.ingredients;
          const results = ingredientsDB.filter(ingredientDB => ingredients.some(ingredient => ingredient === ingredientDB));
          return results.length > 0 && recipe;
        });

        const allRecipesREST = await dataSources.dataAPI.getAllRecipes(ingredients);
        let recipes = [...filteredRecipesDB, ...allRecipesREST];
        console.log(recipes, "recipes")

        return recipes;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    recipeDetails: async (_, { id }, { dataSources }) => {
      console.log(id, "id")
      try {

        const recipeFromDb = await Recipe.findById(id);
        return recipeFromDb ? recipeFromDb : dataSources.dataAPI.getRecipeDetails(id)
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    createRecipe: combineResolvers(isAuthenticated, async (_, input, { user }) => {
      try {
        const user = await User.findOne({ email: user.email });
        console.log(user, "user, user");

        const recipe = new Recipe({ ...input, user: user.id });
        const result = await recipe.save();
        console.log(result);
        user.recipes.push(result.id);
        await recipe.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),
  },
  //   updateRecipe: combineResolvers(isAuthenticated, isRecipeOwner, async (_, { id, input }) => {
  //     try {
  //       const recipe = await Recipe.findByIdAndUpdate(id, { ...input }, { new: true });
  //       return recipe;
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //   }),
  //   deleteRecipe: combineResolvers(isAuthenticated, isRecipeOwner, async (_, { id }, { loggedInUserId }) => {
  //     try {
  //       const recipe = await Recipe.findByIdAndDelete(id);
  //       await User.updateOne({ _id: loggedInUserId }, { $pull: { recipes: recipe.id } });
  //       return recipe;
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //   })
  // },
  Recipe: {
    user: async (parent, _, { loaders }) => {
      console.log(parent, "parent")
      // try {
      //   /* const user = await User.findById(parent.user); */
      //   // const user = await loaders.user.load(parent.user.toString());
      //   return user;
      // } catch (error) {
      //   console.log(error);
      //   throw error;
      // }
    }
  }
}