"use strict";
module.exports = (sequelize, DataTypes) => {
  const view = sequelize.define(
    "view",
    {
      creative_id: DataTypes.INTEGER,
      view_count: DataTypes.INTEGER,
      view_date: DataTypes.INTEGER
    },
    {}
  );
  view.associate = function(models) {
    // associations can be defined here
  };
  return view;
};
