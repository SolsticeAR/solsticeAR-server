const date1 = new Date(new Date().setDate(-15)).getTime();
const date2 = new Date(new Date().setDate(-14)).getTime();
const date3 = new Date(new Date().setDate(-10)).getTime();
const date4 = new Date(new Date().setDate(-9)).getTime();
const date5 = new Date(new Date().setDate(-8)).getTime();
const date6 = new Date(new Date().setDate(-2)).getTime();
const date7 = new Date(new Date().setDate(-1)).getTime();
const today = new Date().getTime();

const campaignData = [
  {
    name: "fakeCampaignName1",
    id: 1,
    media: [
      {
        id: 1,
        name: "Parapapapaprapapapa Creative 1",
        type: "image",
        url: "https://i.imgur.com/hAEgw6T.png",
        views: [
          { date: date1, views: 10 }, //backend will send us string to put value in Date Obj
          { date: date2, views: 20 }
        ]
      },
      {
        id: 2,
        name: "Parapapapaprapapapa Creative 2",
        type: "image",
        url: "https://i.imgur.com/B9mtGQ9.png",
        views: [{ date: date4, views: 3 }, { date: today, views: 40 }]
      }
    ]
  },
  {
    name: "fakeCampaignName2",
    id: 2,
    media: [
      {
        id: 1,
        type: "image",
        name: "Parapapapaprapapapa Creative 3",
        url: "https://i.imgur.com/0o1eDml.png",
        views: [
          { date: date3, views: 0 }, //backend will send us string to put value in Date Obj
          { date: date4, views: 100 }
        ]
      },
      {
        id: 2,
        type: "image",
        name: "Parapapapaprapapapa Creative 4",
        url: "https://i.imgur.com/7cdQJBI.png",
        views: [{ date: date4, views: 3 }, { date: today, views: 4 }]
      }
    ]
  }
];

module.exports = campaignData;
