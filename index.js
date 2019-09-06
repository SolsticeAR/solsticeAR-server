const { ApolloServer, UserInputError } = require("apollo-server");
const { AdminAPI } = require("./datasources");
const resolvers = require("./resolvers");
const typeDefs = require("./typedefs");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    adminAPI: new AdminAPI()
  })
});

server.listen().then(async ({url}) => {
  console.log(`Server is listening at ${url}`);
});
