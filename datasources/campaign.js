const { DataSource } = require("apollo-datasource");
const { AuthenticationError, UserInputError } = require("apollo-server");
const db = require("../models");

class Campaign {
  constructor(campainData) {
    this.id = campainData.id;
    this.name = campainData.name;
    this.adminId = campainData.admin_id;
    this.active = campainData.active;
    this.activeCreativeId = campainData.active_creative_id;
    this.createdAt = campainData.createdAt;
    this.updatedAt = campainData.updatedAt;
    if (!campainData.creatives) {
      this.media = [];
    } else {
      this.media = campainData.creatives.map(creative => {
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
  }
}

class CampaignAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.context = config.context;
  }

  async getMediaById(id) {
    let media = await db["creative"].findOne({
      where: { id }
    });
    return media;
  }

  async getCampaignById(id) {
    let campaign = await db["campaign"].findOne({
      where: { id }
    });
    return campaign;
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

  async setActiveMedia(campaignId, mediaId) {
    if (!campaignId || !mediaId)
      throw UserInputError("Please provide campaignID and mediaID");

    const update = await db["campaign"].update(
      {
        active_creative_id: mediaId
      },
      {
        where: {
          id: campaignId
        }
      }
    );

    return update ? true : false;
  }

  async addMedia({ name, type, url, campaignId }) {
    if (name && name.trim() === "")
      throw new UserInputError("Name was not supplied.");

    const insert = await db["creative"].create({
      name,
      type,
      url,
      campaign_id: campaignId
    });
    return {
      id: insert.id,
      type: insert.type,
      name: insert.name,
      url: insert.url,
      views: []
    };
  }

  async createOrIncrementViews(campaignId) {
    const campaign = await this.getCampaignById(campaignId);
    const activeMediaId = campaign.active_creative_id;
    console.log("ACTIVE MEDIA ID: ", activeMediaId);
    if (!activeMediaId) {
      console.log("ACTIVE MEDIA NOT FOUND");
      return -1;
    }

    const today = new Date();
    const view_date = `${today.getFullYear()}${today.getMonth()}${today.getDate()}`;
    let view = await db["view"].increment("view_count", {
      where: {
        creative_id: activeMediaId,
        view_date
      }
    });
    console.log(view[0][0][0]);
    if (view && view[0] && view[0][0] && view[0][0][0])
      console.log("View count increased on :", view[0][0][0]);
    else {
      const insert = await db["view"].create({
        view_count: 1,
        view_date: view_date,
        creative_id: activeMediaId
      });
    }
    return activeMediaId;
  }

  async getCampaigns() {
    if (!this.context)
      throw new AuthenticationError("Please log in to your account");
    const campaigns = await db["campaign"].findAll({
      include: [
        {
          model: db["creative"],
          include: [db["view"]]
        }
      ]
    });
    const results = campaigns.map(campaign => new Campaign(campaign));

    return results;
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

    const results = campaigns.map(campaign => new Campaign(campaign));
    return results;
  }
}

module.exports = CampaignAPI;
