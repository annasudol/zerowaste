const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  servings: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  readyInMinutes: {
    type: Number,
    required: true
  },
  ingredients: [{ type: String, required: true }],
  detailedIngredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  sourceUrl: {
    type: String,
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);