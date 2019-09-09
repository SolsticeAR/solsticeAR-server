const { DataSource } = require("apollo-datasource");
const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AuthenticationError, UserInputError } = require("apollo-server");

const SECRET_KEY = "temp_secret";

class AdminAPI extends DataSource {
  constructor() {
    super();
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  /**
   * Admin can be retrieved by email
   */
  async findAdminByEmail(email = "") {
    let admin = await db["admin"].findOne({
      where: { email }
    });
    return admin;
  }
  async createAdmin({ name, password, email, industry = null }) {
    const hashedPassword = await bcrypt.hash(password, 8);
    try {
      const admin = await db["admin"].create({
        name,
        email,
        industry,
        password: hashedPassword
      });
      return admin;
    } catch (err) {
      throw new UserInputError(
        "User input error. Please make sure your data is setup properly."
      );
    }
  }

  async login(email, password) {
    const admin = await this.findAdminByEmail(email);
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      throw new AuthenticationError("Login info does not match our records.");
    }

    const token = jwt.sign(
      {
        email: admin.email
      },
      SECRET_KEY, //TODO: switch to something more safe
      {
        expiresIn: "30d" //token will expire in 30 days
      }
    );

    return {
      token,
      data: admin
    };
  }
  /* This is how you authenticate a request */
  test() {
    if (!this.context)
      throw new AuthenticationError(
        "Login information does not match our records"
      );
  }
}

module.exports = AdminAPI;
