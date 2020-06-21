const { GraphQLDateTime } = require('graphql-iso-date');

const userResolver = require('./user');
const recipeResolver = require('./recipe');

const customDateScalarResolver = {
  Date: GraphQLDateTime
}

module.exports = [
  userResolver,
  recipeResolver,
  customDateScalarResolver
];