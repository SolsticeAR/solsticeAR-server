"use strict";
module.exports = (sequelize, DataTypes) => {
  const campaign = sequelize.define(
    "campaign",
    {
      admin_id: DataTypes.STRING,
      url_campaign: DataTypes.STRING,
      active: DataTypes.BOOLEAN
    },
    {}
  );
  campaign.associate = function(models) {
    // associations can be defined here
  };
  return campaign;
};
