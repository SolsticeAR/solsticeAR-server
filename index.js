const express = require("express");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const { AdminAPI, CampaignAPI } = require("./datasources");
const resolvers = require("./resolvers");
const typeDefs = require("./typedefs");
const jwt = require("jsonwebtoken");
const mustache = require("mustache-express");
const { getImage } = require("./utils");

/**
 * Static jwt authentication function
 */
const context = ({ req }) => {
  const token = req.headers.authorization || "";
  if (!token) return null;
  const splitToken = token.split(" ")[1];
  const jwtVerify = jwt.verify(splitToken, "temp_secret");
  console.log(jwtVerify);
  return jwtVerify;
};

const adminAPI = new AdminAPI();
const campaignAPI = new CampaignAPI();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    adminAPI,
    campaignAPI
  }),
  context
});

const app = express();
app.engine("html", mustache());
app.set("view engine", "html");
app.set("views", __dirname + "/views");

server.applyMiddleware({ app, path: "/api" });

const renderError = (res, msg) => {
  res.render("error.html", { msg });
};

app.get("/mobilecampaign/:campaignID", async (req, res) => {
  const media = await campaignAPI.getActiveMediaCampaign(req.params.campaignID);
  res.send(JSON.stringify(media));
});

app.get("/campaign/:campaignID", async (req, res) => {
  const activeMediaId = await campaignAPI.createOrIncrementViews(
    req.params.campaignID
  );
  if (activeMediaId === -1) {
    const msg = "This campaign is not setup yet. Please come back soon";
    renderError(res, msg);
  } else {
    const media = await campaignAPI.getMediaById(activeMediaId);
    switch (media.type) {
      case "image":
        console.log(
          "Attempting to render image template, with img url: " + media.url
        );
        const img = await getImage(media.url);
        res.render("image.html", { imageUrl: img });
        break;
      default:
        renderError(res, "Media type is not handled yet: ", media.type);
    }
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});
