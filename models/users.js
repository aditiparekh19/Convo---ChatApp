'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, Sequelize) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    username: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true
    },
    email:  {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    imageUrl: Sequelize.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};