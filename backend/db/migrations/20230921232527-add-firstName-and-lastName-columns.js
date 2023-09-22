'use strict';
const { QueryInterface } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(options, 'Users', 'firstName', {
      type: Sequelize.STRING
    }),

      await queryInterface.addColumn(options, 'Users', 'lastName', {
        type: Sequelize.STRING
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(options, 'Users', 'firstName');
    await queryInterface.removeColumn(options, 'Users', 'lastName');
  }
};
