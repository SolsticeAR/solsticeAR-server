"use strict";
module.exports = (sequelize, DataTypes) => {
  const campaign = sequelize.define(
    "campaign",
    {
      name: DataTypes.STRING,
      admin_id: DataTypes.INTEGER,
      active: DataTypes.BOOLEAN,
      active_creative_id: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );
  campaign.associate = function(models) {
    // associations can be defined here
  };
  return campaign;
};
