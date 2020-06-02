const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { combineResolvers } = require('graphql-resolvers');

const User = require('../database/models/user');
const Recipe = require('../database/models/recipe');
const { isAuthenticated } = require('./middleware');
const PubSub = require('../subscription');
const { userEvents } = require('../subscription/events');

module.exports = {
  Query: {
    user: combineResolvers(isAuthenticated, async (_, __, { user }) => {
      const email = user?.email;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('User not found!');
        }
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    })
  },
  Mutation: {
    signUpUser: async (_, input) => {
      try {
        const user = await User.findOne({ email: input.email });
        if (user) {
          throw new Error('Email already in use');
        }
        const hashedPassword = await bcrypt.hash(input.password, 12);
        const newUser = new User({ ...input, password: hashedPassword });
        const result = await newUser.save();
        PubSub.publish(userEvents.USER_CREATED, {
          userCreated: result
        });
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    login: async (_, input) => {
      try {
        const user = await User.findOne({ email: input.email });
        if (!user) {
          throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(input.password, user.password);
        if (!isPasswordValid) {
          throw new Error('Incorrect Password');
        }
        const secret = 'mysecretkey';
        const token = jwt.sign({ email: user.email }, secret, { expiresIn: '7d' });
        return { token };
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
  Subscription: {
    userCreated: {
      subscribe: () => PubSub.asyncIterator(userEvents.USER_CREATED)
    }
  },
  User: {
    recipes: async ({ id }) => {
      try {
        const recipes = await Recipe.find({ user: id });
        return recipes;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
}