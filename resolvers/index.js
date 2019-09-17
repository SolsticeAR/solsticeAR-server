const mockCampaignData = require("../mocks/campaignData.js");

//Helper class to serialize data.
class Admin {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.industry = data.industry;
  }
}

const resolvers = {
  Query: {
    getAdmin: async (_, { email }, { dataSources }) => {
      const data = await dataSources.adminAPI.findAdminByEmail(email);
      return data ? new Admin(data) : null;
    },
    getAdminCampaigns: async (_, { adminID }, { dataSources }) => {
      const campaigns = await dataSources.campaignAPI.getAdminCampaigns(
        adminID
      );
      return campaigns;
    },
    getActiveMediaCampaign: async (_, { campaignId }, { dataSources }) => {
      const campaigns = await dataSources.campaignAPI.getActiveMediaCampaign(
        campaignId
      );
      return campaigns;
    },
    getCampaigns: async (_, {}, { dataSources }) => {
      const campaigns = await dataSources.campaignAPI.getCampaigns();
      return campaigns;
    }
  },
  Mutation: {
    register: async (_, { adminData }, { dataSources }) => {
      const data = await dataSources.adminAPI.createAdmin(adminData);
      return new Admin(data);
    },
    login: async (_, { email, password }, { dataSources }) => {
      const { token, data } = await dataSources.adminAPI.login(email, password);
      return {
        token,
        admin: new Admin(data)
      };
    },
    test: (_, { campaignID }, { dataSources }) => {
      dataSources.adminAPI.test();
    },
    addCampaign: (_, { campaign }, { dataSources }) => {
      const newCampaign = dataSources.campaignAPI.addCampaign(
        campaign.name,
        campaign.adminID
      );
      return newCampaign;
    },
    addMedia: (_, { media }, { dataSources }) => {
      const newMedia = dataSources.campaignAPI.addMedia(media);
      return newMedia;
    },
    setActiveMedia: (_, { campaignID, mediaID }, { dataSources }) => {
      const result = dataSources.campaignAPI.setActiveMedia(
        campaignID,
        mediaID
      );
      return result;
    }
  }
};

module.exports = resolvers;
