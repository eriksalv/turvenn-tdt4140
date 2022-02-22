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
    static associate({ Trip }) {
      this.hasMany(Trip, {
        foreignKey: 'userId',
        as: 'trips'
      });
    }

    toJSON() {
      return { ...this.get(), password: undefined, createdAt: undefined, updatedAt: undefined };
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        unique: true,
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
