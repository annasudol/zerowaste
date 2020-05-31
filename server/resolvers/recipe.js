const { combineResolvers } = require('graphql-resolvers');

const Recipe = require('../database/models/recipe');
const User = require('../database/models/user');
const { isAuthenticated, isRecipeOwner } = require('./middleware');
const { dataToString, paginateResults } = require('../helper');

module.exports = {
  Query: {
    // recipes: combineResolvers(isAuthenticated, async (_, { cursor, pageSize = 10 }, { loggedInUserId }) => {

    recipes: async (_, { ingredients, cursor, pageSize = 5 }, { dataSources, user }) => {
      try {
        const recipesDB = await Recipe.find({});
        const filteredRecipesDB = await recipesDB.filter(recipe => {
          const ingredientsDB = recipe.ingredients;
          const results = ingredientsDB.filter(ingredientDB => ingredients.some(ingredient => ingredient === ingredientDB));
          return results.length > 0 && recipe;
        });

        const allRecipesREST = await dataSources.dataAPI.getAllRecipes(ingredients);
        let recipes = [...filteredRecipesDB, ...allRecipesREST];
        const recipesSliced = await paginateResults({
          cursor,
          pageSize,
          results: recipes,
        });
        const lastSlicedRecipeId = recipesSliced.length ? dataToString(recipesSliced[recipesSliced.length - 1].id) : null

        return {
          recipes: recipesSliced !== null ? recipesSliced : [],
          nextPageCursor: lastSlicedRecipeId !== dataToString(recipes[recipes.length - 1].id) ? lastSlicedRecipeId : null,

        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    recipeDetails: async (_, { id }, { dataSources }) => {
      try {
        console.log(id, "id")
        const recipeFromDb = await Recipe.findById(id);
        return recipeFromDb ? recipeFromDb : dataSources.dataAPI.getRecipeDetails(id)
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // recipes: combineResolvers(isAuthenticated, async (_, { cursor, pageSize = 10 }, { loggedInUserId }) => {
    //   try {
    //     const query = { user: loggedInUserId };
    //     if (cursor) {
    //       query['_id'] = {
    //         '$lt': base64ToString(cursor)
    //       }
    //     };
    // let recipes = await Recipe.find(query).sort({ _id: -1 }).pageSize(pageSize + 1);
    // const hasNextPage = recipes.length > pageSize;
    // recipes = hasNextPage ? recipes.slice(0, -1) : recipes;
    // return {
    //   recipeFeed: recipes,
    //   pageInfo: {
    //     nextPageCursor: hasNextPage ? stringToBase64(recipes[recipes.length - 1].id) : null,
    //     hasNextPage
    //   }
    // };
    //   } catch (error) {
    //     console.log(error);
    //     throw error;
    //   }
    // }),
    recipe: combineResolvers(isAuthenticated, isRecipeOwner, async (_, { id }) => {
      try {
        const recipe = await Recipe.findById(id);
        return recipe;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),
  },
  Mutation: {
    createRecipe: combineResolvers(isAuthenticated, async (_, input, { user }) => {
      console.log(user.email, "user.email");
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
    updateRecipe: combineResolvers(isAuthenticated, isRecipeOwner, async (_, { id, input }) => {
      try {
        const recipe = await Recipe.findByIdAndUpdate(id, { ...input }, { new: true });
        return recipe;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),
    deleteRecipe: combineResolvers(isAuthenticated, isRecipeOwner, async (_, { id }, { loggedInUserId }) => {
      try {
        const recipe = await Recipe.findByIdAndDelete(id);
        await User.updateOne({ _id: loggedInUserId }, { $pull: { recipes: recipe.id } });
        return recipe;
      } catch (error) {
        console.log(error);
        throw error;
      }
    })
  },
  // Recipe: {
  //   user: async (parent, _, { loaders }) => {
  //     try {
  //       /* const user = await User.findById(parent.user); */
  //       const user = await loaders.user.load(parent.user.toString());
  //       return user;
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //   }
  // }
}