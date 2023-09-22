'use strict';

const { QueryInterface } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user', 'firstName', {
      type: Sequelize.STRING
    });

    await queryInterface.addColumn('user', 'lastName', {
      type: Sequelize.STRING
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('user', 'firstName');
    await queryInterface.removeColumn('user', 'lastName');
  }
};
