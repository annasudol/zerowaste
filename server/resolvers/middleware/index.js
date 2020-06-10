const { skip } = require('graphql-resolvers');
const Recipe = require('../../database/models/recipe');
const { isValidObjectId } = require('../../database/util');

module.exports.isAuthenticated = (_, __, { user }) => {
  if (!user) {
    throw new Error('Access Denied! Please login to continue');
  }
  return skip;
}

module.exports.isRecipeOwner = async (_, { id }, { userId }) => {
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      throw new Error('Recipe not found');
    } else if (recipe.user.toString() !== userId) {
      throw new Error('Not authorized as recipe owner');
    }
    return skip;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const multer = require('multer');
const uuid = require('uuid/v1');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

module.exports.fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid() + '.' + ext);
    }
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error('Invalid mime type!');
    cb(error, isValid);
  }
});

