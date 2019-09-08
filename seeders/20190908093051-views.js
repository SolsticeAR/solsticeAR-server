"use strict";

const date1 = new Date(new Date().setDate(-15));
const date2 = new Date(new Date().setDate(-14));
const date3 = new Date(new Date().setDate(-10));
const date4 = new Date(new Date().setDate(-9));
const date5 = new Date(new Date().setDate(-8));
const date6 = new Date(new Date().setDate(-2));
const date7 = new Date(new Date().setDate(-1));

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("views", [
      {
        creative_id: 1,
        view_count: 0,
        createdAt: date1,
        updatedAt: date1
      },
      {
        creative_id: 1,
        view_count: 30,
        createdAt: date2,
        updatedAt: date2
      },
      {
        creative_id: 1,
        view_count: 3,
        createdAt: date3,
        updatedAt: date3
      },
      {
        creative_id: 1,
        view_count: 0,
        createdAt: date4,
        updatedAt: date4
      },
      {
        creative_id: 2,
        view_count: 0,
        createdAt: date5,
        updatedAt: date5
      },
      {
        creative_id: 2,
        view_count: 4,
        createdAt: date6,
        updatedAt: date6
      },
      {
        creative_id: 2,
        view_count: 4,
        createdAt: date6,
        updatedAt: date6
      },
      {
        creative_id: 2,
        view_count: 3,
        createdAt: date7,
        updatedAt: date7
      },
      {
        creative_id: 2,
        view_count: 45,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        creative_id: 2,
        view_count: 0,
        createdAt: date2,
        updatedAt: date2
      },
      {
        creative_id: 3,
        view_count: 32,
        createdAt: date6,
        updatedAt: date6
      },
      {
        creative_id: 3,
        view_count: 32,
        createdAt: date7,
        updatedAt: date7
      },
      {
        creative_id: 3,
        view_count: 32,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("views", null, {});
  }
};
