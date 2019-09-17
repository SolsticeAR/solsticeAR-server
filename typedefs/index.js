const { gql } = require("apollo-server");

const typeDefs = gql(`
    type Admin {
      id: Int
      name: String
      email: String
      industry: String
    }

    type Campaign {
      id: Int!
      name: String!
      active: Boolean!
      activeCreativeId: Int
      media: [Media]
    }

    type Media {
      id: Int!
      type: String!
      name: String!
      url: String!
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

    input NewCampaignInput {
      name: String
      adminID : Int
    }

    input NewMediaInput {
      name: String!
      url: String!
      type: String!
      campaignID: Int!
    }


    type Query {
      getAdmin(email: String!): Admin
      getAdminCampaigns(adminID: Int): [Campaign]
      getActiveMediaCampaign(campaignId: Int): [Campaign]
      getCampaigns:[Campaign]
    }

    type LoginResponse {
      token: String
      admin: Admin
    }

    type Mutation {
      register(adminData: NewAdminInput): Admin
      login(email: String, password: String): LoginResponse
      test(campaignID: Int): Int
      addCampaign(campaign:NewCampaignInput):Campaign
      addMedia(media:NewMediaInput): Media
      setActiveMedia(campaignID: Int, mediaID: Int): Boolean
    }
`);

module.exports = typeDefs;
