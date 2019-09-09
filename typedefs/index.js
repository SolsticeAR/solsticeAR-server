const { gql } = require("apollo-server");

const typeDefs = gql(`
    type Admin {
      id: Int
      name: String
      email: String
      industry: String
    }

    type Campaign {
      id: Int
      name: String
      media: [Media]
    }

    type Media {
      id: Int
      type: String
      name: String
      url: String
      views: [View]
    }

    type View {
      date: Float
      views: Int
    }

    input NewAdminInput {
      name: String!
      email: String!
      password: String!
      industry: String

    }
    type Query {
      getAdmin(email: String!): Admin
      getAdminCampaigns(adminID: Int): [Campaign]
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
