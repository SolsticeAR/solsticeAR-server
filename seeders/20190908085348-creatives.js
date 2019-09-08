"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("creatives", [
      {
        name: "Parapapapaprapapapa Creative 1",
        type: "image",
        url: "https://i.imgur.com/hAEgw6T.png",
        campaign_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Parapapapaprapapapa Creative 2",
        type: "image",
        url: "https://i.imgur.com/B9mtGQ9.png",
        campaign_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Parapapapaprapapapa Creative 3",
        type: "image",
        url: "https://i.imgur.com/0o1eDml.png",
        campaign_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Parapapapaprapapapa Creative 4",
        type: "image",
        url: "https://i.imgur.com/7cdQJBI.png",
        campaign_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Parapapapaprapapapa Creative 1",
        type: "image",
        url: "https://i.imgur.com/7cdQJBI.png",
        campaign_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Parapapapaprapapapa Creative 2",
        type: "image",
        url: "https://i.imgur.com/kw2H7CM.png",
        campaign_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Parapapapaprapapapa Creative 1",
        type: "image",
        url: "https://i.imgur.com/7cdQJBI.png",
        campaign_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Parapapapaprapapapa Creative 2",
        type: "image",
        url: "https://i.imgur.com/kw2H7CM.png",
        campaign_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Creative", null, {});
  }
};
