const { DataSource } = require("apollo-datasource");
const { AuthenticationError, UserInputError } = require("apollo-server");
const db = require("../models");
const sequelize = require("sequelize");

class Campaign {
  constructor(campaignData) {
    this.id = campaignData.id;
    this.name = campaignData.name;
    this.adminId = campaignData.admin_id;
    this.active = campaignData.active;
    this.activeCreativeId = campaignData.active_creative_id;
    this.createdAt = campaignData.createdAt;
    this.updatedAt = campaignData.updatedAt;
    if (!campaignData.creatives) {
      this.media = [];
    } else {
      this.media = campaignData.creatives.map(creative => {
        const serializeCreative = {};
        serializeCreative.totalViews = 0;
        if (!creative.views) {
          serializeCreative.views = [];
        } else {
          serializeCreative.views = creative.views.map(view => {
            serializeCreative.totalViews += view.view_count;
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
    if (name === "null"){
      let maxid = await db["campaign"].max("id");
      name = `Experience ${++maxid}`;
    }
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
    const results = campaigns.map(campaign => new Campaign(campaign)).filter(campaign => campaign.activeCreativeId);

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

  //new
  async getActiveMediaCampaign(campaignId) {
    if (!campaignId) throw new UserInputError("CampaignID was not provided.");

    if (!this.context)
      throw new AuthenticationError("Please log in to your account");

    const activeCreativeId = await db["campaign"].findOne({
      attributes: ["active_creative_id"],
      where: {
        id: campaignId
      }
    });

    //console.log("this is active creative id:", activeCreativeId);

    const campaigns = await db["campaign"].findAll({
      where: {
        "$campaign.id$": campaignId,
        "$creatives.id$": activeCreativeId.active_creative_id
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
