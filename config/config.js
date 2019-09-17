// dotenv
require("dotenv").config();

module.export = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "solstice",
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases: false
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "solstice",
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases: false
  },
  production: {
    dialect: "postgres",
    url: process.env.DATABASE_URL
  }
};
