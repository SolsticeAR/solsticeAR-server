"use strict";
module.exports = (sequelize, DataTypes) => {
  const creative = sequelize.define(
    "creative",
    {
      url: DataTypes.STRING,
      type: DataTypes.STRING,
      name: DataTypes.STRING,
      campaign_id: DataTypes.INTEGER
    },
    {}
  );
  creative.associate = function(models) {
    // associations can be defined here
  };
  return creative;
};
