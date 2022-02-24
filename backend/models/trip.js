'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Participation }) {
      this.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user',
        constraints: true,
        onDelete: 'CASCADE'
      });
      this.belongsToMany(User, {
        through: Participation,
        as: 'participators',
        foreignKey: 'tripId'
      });
      this.hasMany(Participation, {
        foreignKey: 'tripId'
      });
    }
  }
  Trip.init(
    {
      name: DataTypes.STRING,
      start: DataTypes.STRING,
      goal: DataTypes.STRING,
      date: DataTypes.DATE,
      difficulty: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      description: DataTypes.STRING,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Trip',
      tableName: 'Trips'
    }
  );
  return Trip;
};
