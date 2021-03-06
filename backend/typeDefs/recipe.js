const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    recipes(ingredients: [String!]!): [Recipe]!
    recipe(id: ID!): RecipeDetails!
  }

  extend type Mutation {
    createRecipe(
      title: String!
      servings: Int!
      image: String!
      readyInMinutes: Int!
      ingredients: [String!]!
      detailedIngredients: [String!]!
      instructions: String!
      sourceUrl: String
    ): RecipeDetails!
    updateRecipe(
      id: ID!
      title: String!
      servings: Int!
      image: String!
      readyInMinutes: Int!
      ingredients: [String!]!
      detailedIngredients: [String!]!
      instructions: String!
      sourceUrl: String
      ): Recipe!
    deleteRecipe(id: ID!): Recipe!
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
    instructions: String
    user: User
    author: String
    sourceUrl: String
    createdAt: Date
    updatedAt: Date
  }

  extend type Subscription {
    changesInRecipe: Recipe
  }

`;