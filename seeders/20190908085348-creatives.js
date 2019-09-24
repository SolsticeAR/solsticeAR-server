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
      },
      {
        name: "Llama with an opinion",
        type: "image",
        url:
          "http://vrmockforjill.nfshost.com/images/llama_with_an_opinion.jpg",
        campaign_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Video - MP4",
        type: "video",
        url: "http://vrmockforjill.nfshost.com/images/sample_mp4.mp4",
        campaign_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Dancing Llama",
        type: "animatedImage",
        url: "http://vrmockforjill.nfshost.com/images/llama.gif",
        campaign_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Hola Mundo",
        type: "text",
        url: "",
        campaign_id: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("creatives", null, {});
  }
};
