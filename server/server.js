const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');
const jwt = require('jsonwebtoken');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const connection = require('./database/util');
const User = require('./database/models/user');
const DataAPI = require('./database/dataAPI');
const cloudinary = require('cloudinary');

require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});
console.log("Cloudinary connected")




// set env variables
dotEnv.config();

const app = express();

//db connectivity
connection();

//cors
app.use(cors());

// body parser middleware
app.use(express.json());


app.post('/delete/', function (req, res) {
  cloudinary.v2.api.delete_resources(req.body.public_id,
    function (error, result) {
      if (error) {
        console.log("Error Occured", error);
      } else {
        console.log("Image will has been deleted", result)
      }
    });
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    try {
      if (req) {
        const header = await req.headers;
        const bearerHeader = await header.authorization;

        if (bearerHeader) {
          const token = bearerHeader.split(' ')[1];
          const payload = jwt.verify(token, 'mysecretkey');

          const user = await User.findOne({ email: payload.email });

          return { user, email: user.email, userId: user.id }
        }
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
  },
  subscriptions: {
    path: "/subscriptions",
    onConnect: async (connectionParams, webSocket, context) => {
      console.log(`Subscription client connected using Apollo server's built-in SubscriptionServer.`)
    },
    onDisconnect: async (webSocket, context) => {
      console.log(`Subscription client disconnected.`)
    }
  }
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 9000;

app.use('/', (req, res, next) => {
  res.send({ message: 'Hello' });
})

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
  console.log(`Graphql Endpoint: ${apolloServer.graphqlPath}`);
});

apolloServer.installSubscriptionHandlers(httpServer);