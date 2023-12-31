'use strict';

const { Booking } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: '1996, 4, 5',
        endDate: '2002, 3, 1'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2020, 7, 19',
        endDate: '2022, 1, 20'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '1995, 2, 4',
        endDate: '1998, 3, 4'
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Booking';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
