"use strict";
const { AdminAPI } = require("../datasources");
const adminAPI = new AdminAPI();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      adminAPI.createAdmin({
        name: "Admin Name",
        password: "password",
        email: "admin@test.com",
        industry: "Seeding Tables"
      }),
      adminAPI.createAdmin({
        name: "John",
        password: "password",
        email: "demo@demo.com",
        industry: "IT"
      }),
      adminAPI.createAdmin({
        name: "Baby Jules",
        password: "password",
        email: "jules@test.com",
        industry: "BAUSS"
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("admins", null, {});
  }
};
