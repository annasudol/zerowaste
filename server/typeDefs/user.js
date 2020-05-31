const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    user: User
  }

  extend type Mutation {
    signup(
      name: String!
      email: String!
      password: String!
    ): User
    login(email: String! password: String!): Token
  }

  input loginInput {
    email: String!
    password: String!
  }

  type Token {
    token: String!
  }

  input signupInput {
    name: String!
    email: String!
    password: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    recipes: [Recipe!]
    createdAt: Date!
    updatedAt: Date!
  }

  extend type Subscription {
    userCreated: User
  }

`;