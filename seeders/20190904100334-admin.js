"use strict";
const { AdminAPI } = require("../datasources");
const adminAPI = new AdminAPI();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // many comments because we wanted to seed new data without compromising the live database
      // adminAPI.createAdmin({
      //   name: "Admin Name",
      //   password: "password",
      //   email: "admin@test.com",
      //   industry: "Seeding Tables"
      // }),
      // adminAPI.createAdmin({
      //   name: "John",
      //   password: "password",
      //   email: "demo@demo.com",
      //   industry: "IT"
      // }),
      // adminAPI.createAdmin({
      //   name: "Baby Jules",
      //   password: "password",
      //   email: "jules@test.com",
      //   industry: "BAUSS"
      // }),
      // adminAPI.createAdmin({
      //   name: "Demo",
      //   password: "password",
      //   email: "solstice@demo.com",
      //   industry: "DEMO"
      // })
      adminAPI.createAdmin({
        name: "Solstice",
        password: "solstice",
        email: "solstice@demo.com",
        industry: "Game Master"
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("admins", null, {});
  }
};
