const express = require("express");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const { AdminAPI, CampaignAPI } = require("./datasources");
const resolvers = require("./resolvers");
const typeDefs = require("./typedefs");
const jwt = require("jsonwebtoken");
const mustache = require("mustache-express");

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

app.get("/campaign/:campaignID", (req, res) => {
  const url = "https://i.imgur.com/B9mtGQ9.png";
  res.render("image.html", { imageUrl: url });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});
