"use strict";

const date1 = new Date(new Date().setDate(-15));
const date2 = new Date(new Date().setDate(-14));
const date3 = new Date(new Date().setDate(-10));
const date4 = new Date(new Date().setDate(-9));
const date5 = new Date(new Date().setDate(-8));
const date6 = new Date(new Date().setDate(-2));
const date7 = new Date(new Date().setDate(-1));
const today = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("views", [
      {
        creative_id: 1,
        view_count: 0,
        view_date: `${date1.getFullYear()}${date1.getMonth()}${date1.getDate()}`,
        createdAt: date1,
        updatedAt: date1
      },
      {
        creative_id: 1,
        view_count: 30,
        view_date: `${date2.getFullYear()}${date2.getMonth()}${date2.getDate()}`,
        createdAt: date2,
        updatedAt: date2
      },
      {
        creative_id: 1,
        view_count: 3,
        view_date: `${date3.getFullYear()}${date3.getMonth()}${date3.getDate()}`,
        createdAt: date3,
        updatedAt: date3
      },
      {
        creative_id: 1,
        view_count: 0,
        view_date: `${date4.getFullYear()}${date4.getMonth()}${date4.getDate()}`,
        createdAt: date4,
        updatedAt: date4
      },
      {
        creative_id: 2,
        view_count: 0,
        view_date: `${date5.getFullYear()}${date5.getMonth()}${date5.getDate()}`,
        createdAt: date5,
        updatedAt: date5
      },
      {
        creative_id: 2,
        view_count: 4,
        view_date: `${date6.getFullYear()}${date6.getMonth()}${date6.getDate()}`,
        createdAt: date6,
        updatedAt: date6
      },
      {
        creative_id: 2,
        view_count: 3,
        view_date: `${date7.getFullYear()}${date7.getMonth()}${date7.getDate()}`,
        createdAt: date7,
        updatedAt: date7
      },
      {
        creative_id: 2,
        view_count: 45,
        view_date: `${today.getFullYear()}${today.getMonth()}${today.getDate()}`,
        createdAt: today,
        updatedAt: today
      },
      {
        creative_id: 2,
        view_count: 0,
        view_date: `${date2.getFullYear()}${date2.getMonth()}${date2.getDate()}`,
        createdAt: date2,
        updatedAt: date2
      },
      {
        creative_id: 3,
        view_count: 32,
        view_date: `${date6.getFullYear()}${date6.getMonth()}${date6.getDate()}`,
        createdAt: date6,
        updatedAt: date6
      },
      {
        creative_id: 3,
        view_count: 32,
        view_date: `${date7.getFullYear()}${date7.getMonth()}${date7.getDate()}`,
        createdAt: date7,
        updatedAt: date7
      },
      {
        creative_id: 3,
        view_count: 32,
        view_date: `${today.getFullYear()}${today.getMonth()}${today.getDate()}`,
        createdAt: today,
        updatedAt: today
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("views", null, {});
  }
};
