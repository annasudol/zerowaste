const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    recipes(ingredients: [String!]!): [Recipe]!
    recipeDetails(id: String!): RecipeDetails!
    # RecipeDetails(id: String!): Recipe!
  }


  extend type Mutation {
    createRecipe(
    title: String!
    image: String!
    readyInMinutes: Int!
    ingredients: [String!]!
    detailedIngredients: [String!]!
    steps: [String!]
    sourceUrl: String): RecipeDetails!
    # updateRecipe(id: ID!, input: updateRecipeInput!): RecipeDetails!
    # deleteRecipe(id: ID!): Recipe!
  }

  type Recipe {
    id: ID!
    title: String!
    image: String!
    ingredients: [String!]!
    user: User
  }


  type RecipeDetails {
    id: ID!
    title: String!
    image: String!
    readyInMinutes: Int!
    ingredients: [String!]!
    detailedIngredients: [String!]!
    steps: [String!]
    author: String
    sourceUrl: String
    user: User
  }

  input createRecipeInput {
    title: String!
    image: String!
    readyInMinutes: Int!
    ingredients: [String!]!
    detailedIngredients: [String!]!
    steps: [String!]
    sourceUrl: String
  }

  input updateRecipeInput {
    image: String
    readyInMinutes: Int!
    ingredients: [String!]!
    detailedIngredients: [String!]!
    steps: [String!]
    sourceUrl: String
  }
`;