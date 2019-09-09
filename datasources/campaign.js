const { DataSource } = require("apollo-datasource");
const { AuthenticationError, UserInputError } = require("apollo-server");
const db = require("../models");

class CampaignAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.context = config.context;
  }

  async getAdminCampaigns(adminId) {
    if (!adminId)
      throw new UserInputError("AdminID was not provided.");

    if (!this.context)
      throw new AuthenticationError("Please log in to your account");

    const campaigns = await db["campaign"].findAll({
      where: {
        admin_id: adminId
      }
    });

    const result = campaigns.map(campaign => {
      return {
        id: campaign.id,
        name: campaign.name,
      }
    });

    const campaignMedia = await db["creative"].findAll({
      where: {
        campaign_id: campaign.id
      }
    });
  }
}

module.exports = CampaignAPI;