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
  async addCampaign(name, adminId) {
    if (name && name.trim() === "")
      throw new UserInputError("Name was not supplied.");

    const insert = await db["campaign"].create({
      name,
      admin_id: adminId,
      active: true
    });

    return {
      id: insert.id,
      name: insert.name,
      active: insert.active,
      activeCreativeId: insert.active_creative_id,
      media: []
    };
  }

  async addMedia({ name, type, url, campaignID }) {
    if (name && name.trim() === "")
      throw new UserInputError("Name was not supplied.");

    const insert = await db["creative"].create({
      name,
      type,
      url,
      campaign_id: campaignID
    });
    return {
      id: insert.id,
      type: insert.type,
      name: insert.name,
      url: insert.url,
      views: []
    };
  }

  async getAdminCampaigns(adminId) {
    if (!adminId) throw new UserInputError("AdminID was not provided.");

    if (!this.context)
      throw new AuthenticationError("Please log in to your account");

    const campaigns = await db["campaign"].findAll({
      where: {
        admin_id: adminId
      },
      include: [
        {
          model: db["creative"],
          include: [db["view"]]
        }
      ]
    });

    const results = campaigns.map(campaign => {
      const serializeCampaign = {};
      serializeCampaign.id = campaign.id;
      serializeCampaign.name = campaign.name;
      serializeCampaign.adminId = campaign.admin_id;
      serializeCampaign.active = campaign.active;
      serializeCampaign.active_creative_id = campaign.active_creative_id;
      serializeCampaign.createdAt = campaign.createdAt;
      serializeCampaign.updatedAt = campaign.updatedAt;
      if (!campaign.creatives) {
        serializeCampaign.media = [];
      } else {
        serializeCampaign.media = campaign.creatives.map(creative => {
          const serializeCreative = {};
          if (!creative.views) {
            serializeCreative.views = [];
          } else {
            serializeCreative.views = creative.views.map(view => {
              return { views: view.view_count, date: view.createdAt.getTime() };
            });
          }
          serializeCreative.id = creative.id;
          serializeCreative.name = creative.name;
          serializeCreative.type = creative.type;
          serializeCreative.url = creative.url;
          return serializeCreative;
        });
      }
      return serializeCampaign;
    });

    results.map(campaign =>
      campaign.media.map(creative => console.log(creative))
    );

    return results;
  }
}

module.exports = CampaignAPI;
