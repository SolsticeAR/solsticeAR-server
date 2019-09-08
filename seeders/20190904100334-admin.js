"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "admins",
      [
        {
          name: "John",
          password: "password",
          email: "demo@demo.com",
          industry: "IT",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Baby Jules",
          password: "password",
          email: "jules@test.com",
          industry: "BAUSS",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "No Campaign Human",
          password: "password",
          email: "nch@test.com",
          industry: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("admins", null, {});
  }
};
