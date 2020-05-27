// const { gql } = require('apollo-server-express');

const userTypeDefs = require('./user');
const recipeTypeDefs = require('./recipe');

module.exports = [
    userTypeDefs,
    recipeTypeDefs
]

