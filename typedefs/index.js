const { gql } = require("apollo-server");

const typeDefs = gql(`
    type Admin {
      name: String
      email: String
      industry: String
    }

    input NewAdminInput {
      name: String!
      email: String!
      password: String!
      industry: String

    }
    type Query {
      getAdmin(email: String!): Admin
    }

    type LoginResponse {
      token: String
      admin: Admin
    }

    type Mutation {
      register(adminData: NewAdminInput): Admin
      login(email: String, password: String): LoginResponse
      test(campaignID: Int): Int
    }
`);

module.exports = typeDefs;
