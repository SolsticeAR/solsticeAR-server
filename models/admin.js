'use strict';
module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define('admin', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    industry: DataTypes.STRING,
  }, {});
  admin.associate = function(models) {
    // associations can be defined here
  };
  return admin;
};