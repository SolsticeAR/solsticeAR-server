
//Helper class to serialize data.
class Admin {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.industry = data.industry;
  }
}

const resolvers = {
  Query: {
    getAdmin: async (_, {email}, {dataSources}) => {
      const data = await dataSources.adminAPI.findAdminByEmail(email)
      return data ? new Admin(data) : null;
    },
  },
  Mutation: {
    register: async (_, { adminData }, {dataSources}) => {
      const data = await dataSources.adminAPI.createAdmin(adminData);
      return new Admin(data);
    },
    login: async (_, {email, password}, {dataSources}) => {
      const {token, data} = await dataSources.adminAPI.login(email, password);
      return {
        token,
        admin: new Admin(data)
      };
    },
    test: (_, {campaignID}, {dataSources}) => {
      dataSources.adminAPI.test();
    }
  }
};


module.exports = resolvers;