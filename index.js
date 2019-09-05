const { ApolloServer, gql } = require("apollo-server");
const AdminAPI = require("./datasources/admin.js");

const typeDefs = gql(`
    type Admin {
      name: String
      email: String
      industry: String
    }

    type Query {
      admins(email: String!): Admin
    }
`);

class Admin {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.industry = data.industry;
  }
}

const resolvers = {
  Query: {
    admins: async (_, {email}, {dataSources}) => {
      const data = await dataSources.adminAPI.findAdminByEmail(email)
      return data ? new Admin(data) : null;
    },
  }
};

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
