const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    user: User
  }

  extend type Mutation {
    signUpUser(
      name: String!
      email: String!
      password: String!
    ): User!
    login(email: String! password: String!): Token!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    recipes: [Recipe!]
    createdAt: Date!
    updatedAt: Date!
  }

  type UserUpdated {
    user: User 
  }

  extend type Subscription {
    deleteRecipe: UserUpdated
  }

`;