"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("views", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      creative_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "creatives",
          key: "id"
        }
      },
      view_date: {
        type: Sequelize.STRING,
        allowNull: false
      },
      view_count: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("views");
  }
};
