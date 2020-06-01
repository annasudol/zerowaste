const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    recipes(ingredients: [String!]! cursor: String limit: Int): RecipeFeed!
    recipeDetails(id: ID!): RecipeDetails!
  }

  type RecipeFeed {
    recipes: [Recipe]
    nextPageCursor: String
  }


  extend type Mutation {
    createRecipe(
      title: String!
      servings: Int!
      image: String!
      readyInMinutes: Int!
      ingredients: [String!]!
      detailedIngredients: [String!]!
      steps: [String!]!
      sourceUrl: String
    ): RecipeDetails!
    # updateRecipe(id: ID!, input: updateRecipeInput!): Recipe
    # deleteRecipe(id: ID!): Recipe
  }


  type Recipe {
    id: ID!
    title: String!
    image: String!
    ingredients: [String!]!
    user: User
    createdAt: Date
    updatedAt: Date
  }

  type RecipeDetails {
    id: ID!
    servings: Int!
    title: String!
    image: String!
    detailedIngredients: [String!]!
    readyInMinutes: Int
    steps: [String]
    user: User
    author: String
    sourceUrl: String
    createdAt: Date
    updatedAt: Date
  }
`;