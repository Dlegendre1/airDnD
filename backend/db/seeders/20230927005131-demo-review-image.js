'use strict';

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'reviewimage1@image.com'
      },
      {
        reviewId: 2,
        url: 'reviewimage2@image.com'
      },
      {
        reviewId: 3,
        url: 'reviewimage3@image.com'
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReviewImage';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['reviewimage1@image.com', 'reviewimage2@image.com', 'reviewimage3@image.com'] }
    }, {});
  }
};
