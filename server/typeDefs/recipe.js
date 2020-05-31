const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    recipes(ingredients: [String!]! cursor: String limit: Int): RecipeFeed!
    recipeDetails(id: ID!): RecipeDetails!
    recipe(id: ID!): Recipe
  }

  type RecipeFeed {
    recipes: [Recipe]
    nextPageCursor: String
  }


  extend type Mutation {
    createRecipe(
      title: String!
      image: String!
      readyInMinutes: Int!
      ingredients: [String!]!
      detailedIngredients: [String!]!
      steps: [String!]!
      sourceUrl: String
    ): Recipe
    updateRecipe(id: ID!, input: updateRecipeInput!): Recipe
    deleteRecipe(id: ID!): Recipe
  }

  input updateRecipeInput {
    title: String
  }

  type Recipe {
    id: ID!
    title: String!
    image: String!
    ingredients: [String!]!
    # user: User!
    # createdAt: Date
    # updatedAt: Date
  }

  type RecipeDetails {
    id: ID!
    title: String!
    image: String!
    detailedIngredients: [String!]!
    steps: [String!]
    user: User
    author: String
    createdAt: Date!
    updatedAt: Date!
  }
`;