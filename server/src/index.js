const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const DataAPI = require('./datasources/data');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        dataAPI: new DataAPI()
    })
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});