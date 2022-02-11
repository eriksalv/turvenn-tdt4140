'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'password', {
      type: Sequelize.STRING(64),
      allowNull: false
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'password');
  }
};
