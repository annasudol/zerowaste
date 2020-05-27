const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  readyInMinutes: { type: Number, required: true },
  ingredients: [{ type: String, required: true }],
  detailedIngredients: [{ type: String, required: true }],
  sourceUrl: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);