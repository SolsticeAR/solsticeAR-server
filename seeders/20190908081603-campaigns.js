"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("campaigns", [
      // many comments because we wanted to seed new data without compromising the live database
      // {
      //   name: "Test Campaign 1",
      //   admin_id: 1,
      //   active: true,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   name: "Test Campaign 2",
      //   admin_id: 1,
      //   active: true,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   name: "Test Campaign 3",
      //   admin_id: 1,
      //   active: true,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   name: "Test Campaign 1",
      //   admin_id: 2,
      //   active: true,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   name: "DEMO IMAGE",
      //   admin_id: 4,
      //   active: true,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   name: "DEMO VIDEO",
      //   admin_id: 4,
      //   active: true,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   name: "DEMO GIF",
      //   admin_id: 4,
      //   active: true,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   name: "DEMO TEXT",
      //   admin_id: 4,
      //   active: true,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // }
      {
        name: "Hulk Hogan",
        admin_id: 6,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("campaigns", null, {});
  }
};
