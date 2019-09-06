const { ApolloServer, AuthenticationError } = require("apollo-server");
const { AdminAPI } = require("./datasources");
const resolvers = require("./resolvers");
const typeDefs = require("./typedefs");
const jwt = require('jsonwebtoken');


/**
  * Static jwt authentication function
*/
const context =  ({ req }) => {
  const token = req.headers.authorization || "";
  const splitToken = token.split(" ")[1];
  const jwtVerify = jwt.verify(splitToken, "temp_secret");
  console.log(jwtVerify);
  return jwtVerify;
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    adminAPI: new AdminAPI()
  }),
  context
});

server.listen().then(async ({url}) => {
  console.log(`Server is listening at ${url}`);
});
