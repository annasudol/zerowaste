const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    recipes(
    ingredients: [String!]!
  ): [Recipe]!
    recipeDetails(id: String!): RecipeDetails!
    recipeInfo(id: String!): Recipe!
    user(id: String!): User!
  }

  type Mutation {
    login(email: String): String
    createRecipe(data: CreateRecipeInput!): Recipe!
  }


  input CreateRecipeInput {
    title: String!
    image: String
    readyInMinutes: Int!
    ingredients: [String!]!
    detailedIngredients: [String!]!
    steps: [String!]
    sourceUrl: String!
    author: String
    authorId: String
  }

  type Recipe {
    id: ID
    title: String
    image: String
    ingredients: [String!]
    user: User
  }


  type RecipeDetails {
    id: ID!
    title: String!
    image: String!
    readyInMinutes: Int!
    detailedIngredients: [String!]!
    steps: [String!]
    author: String
    sourceUrl: String
    user: User
  }

  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
    recipes: [RecipeDetails!]!
  }
`;

module.exports = typeDefs;