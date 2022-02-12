'use strict';

// Add validations in model files

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: DataTypes.STRING
    },
    {
      sequelize,
      tableName: 'Users',
      modelName: 'User'
    }
  );
  return User;
};
