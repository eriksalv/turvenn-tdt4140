const { Sequelize, DataTypes } = require('sequelize');
import { sequelize } from '../server.js';

const User = sequelize.define(
  'user',
  {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    }
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true
