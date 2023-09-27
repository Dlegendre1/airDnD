'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'spotimage1@image.com',
        preview: true
      },
      {
        spotId: 2,
        url: 'spotimage2@image.com',
        preview: false
      },
      {
        spotId: 3,
        url: 'spotimage3@image.com',
        preview: true
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImage';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['spotimage1@image.com', 'spotimage2@image.com', 'spotimage3@image.com'] }
    }, {});
  }
};
