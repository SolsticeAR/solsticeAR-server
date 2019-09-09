"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("campaigns", "active_creative_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "creatives",
        key: "id"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("campaigns", "active_creative_id");
  }
};
