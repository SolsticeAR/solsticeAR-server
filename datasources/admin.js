const { DataSource } = require('apollo-datasource');
const db = require('../models')



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

 
}

module.exports = AdminAPI;