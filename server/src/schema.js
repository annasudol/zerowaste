const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    recipes(
    ingredients: [String!]!
    numberOfResults: Int
    pageSize: Int
    page: Int
  ): [Recipe]!
  recipeDetails(id: String): RecipeDetails
  }


  type Recipe {
    id: ID
    title: String
    image: String
    ingredients: [String!]
  }

  type RecipeDetails {
    id: ID!
    title: String!
    summary: String!
    image: String!
    readyInMinutes: Int!
    detailedIngredients: [String!]!
    author: String!
    sourceUrl: String!
  }

  type User {
    id: ID!
    email: String!
  }

  type Mutation {
    login(email: String): String
  }

`;

module.exports = typeDefs;