// const { PubSub } = require('apollo-server-express');
const { PubSub } = require('graphql-subscriptions');

// const pubSub = new PubSub();
module.exports = new PubSub();