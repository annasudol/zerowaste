const { combineResolvers } = require('graphql-resolvers');

const Recipe = require('../database/models/recipe');
const User = require('../database/models/user');
const { isAuthenticated, isRecipeOwner } = require('./middleware');
const { PubSub } = require('graphql-subscriptions');
const pubSub = new PubSub();
const CHANGES_IN_RECIPE = 'CHANGES_IN_RECIPE';
const DELETE_RECIPE = 'DELETE_RECIPE';

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

        return recipes;
      } catch (error) {
        throw error;
      }
    },
    recipe: async (_, { id }, { dataSources }) => {
      try {
        const recipeDB = (await Recipe.find({})).filter(recipe => recipe.id === id);
        return recipeDB.length ? recipeDB[0] : dataSources.dataAPI.getRecipeDetails(id)
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
  Mutation: {
    createRecipe: combineResolvers(isAuthenticated, async (_, input, { email }) => {
      try {
        const user = await User.findOne({ email });
        const recipe = new Recipe({ ...input, user: user.id });
        const result = await recipe.save();
        user.recipes.push(result.id);
        await recipe.save();
        pubSub.publish(CHANGES_IN_RECIPE, { changesInRecipe: result });
        return result;
      } catch (error) {
        throw error;
      }
    }),
    updateRecipe: combineResolvers(isAuthenticated, isRecipeOwner, async (_, input) => {
      try {
        const id = await input.id
        const recipe = await Recipe.findByIdAndUpdate(id, input);
        pubSub.publish(CHANGES_IN_RECIPE, { changesInRecipe: recipe });

        return recipe;

      } catch (error) {
        throw error;
      }
    }),

    deleteRecipe: combineResolvers(isAuthenticated, isRecipeOwner, async (_, { id }, { userId }) => {
      try {
        const recipe = await Recipe.findByIdAndDelete(id);
        await User.updateOne({ _id: userId }, { $pull: { recipes: recipe.id } });
        const updatedUser = await User.findOne({ _id: userId });
        pubSub.publish(DELETE_RECIPE, { deleteRecipe: { user: updatedUser } });
        return recipe;
      } catch (error) {
        throw error;
      }
    }),
  },
  RecipeDetails: {
    user: async (parent, _,) => {
      try {
        const user = await User.findById(parent.user);
        return user;
      } catch (error) {
        throw error;
      }
    }
  },
  Subscription: {
    changesInRecipe: {
      subscribe: () => pubSub.asyncIterator(CHANGES_IN_RECIPE)
    },
    deleteRecipe: {
      subscribe: () => pubSub.asyncIterator(DELETE_RECIPE)
    }
  }
}