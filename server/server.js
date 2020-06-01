const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');
const Dataloader = require('dataloader');
const jwt = require('jsonwebtoken');

const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const connection = require('./database/util');
const loaders = require('./loaders');
const User = require('./database/models/user');
const DataAPI = require('./database/dataAPI');


// set env variables
dotEnv.config();

const app = express();

//db connectivity
connection();

//cors
app.use(cors());

// body parser middleware
app.use(express.json());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    try {
      const header = await req.headers;
      const bearerHeader = await header.authorization;
      const contextObj = {};
      if (bearerHeader) {
        const token = bearerHeader.split(' ')[1];
        const payload = jwt.verify(token, 'mysecretkey');

        const user = await User.findOne({ email: payload.email });
        contextObj.loaders = {
          user: new Dataloader(keys => loaders.user.batchUsers(keys))
        };
        return { user, email: user.email, userId: user.id }
      }
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return attemptRenewal()
      }

      console.log(error);
      throw error;
    }

  },
  dataSources: () => ({
    dataAPI: new DataAPI()
  }),
  formatError: (error) => {
    return {
      message: error.message
    };
  }




});

apolloServer.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 3000;

app.use('/', (req, res, next) => {
  res.send({ message: 'Hello' });
})

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
  console.log(`Graphql Endpoint: ${apolloServer.graphqlPath}`);
});

apolloServer.installSubscriptionHandlers(httpServer);