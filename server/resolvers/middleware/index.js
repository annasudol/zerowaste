const { skip } = require('graphql-resolvers');
const Recipe = require('../../database/models/recipe');
const { isValidObjectId } = require('../../database/util');

module.exports.isAuthenticated = (_, __, { user }) => {
  if (!user) {
    throw new Error('Access Denied! Please login to continue');
  }
  return skip;
}

module.exports.isTaskOwner = async (_, { id }, { loggedInUserId }) => {
  try {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid Recipe id');
    }
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      throw new Error('Recipe not found');
    } else if (recipe.user.toString() !== loggedInUserId) {
      throw new Error('Not authorized as recipe owner');
    }
    return skip;
  } catch (error) {
    console.log(error);
    throw error;
  }
}