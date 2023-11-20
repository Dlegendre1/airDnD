'use strict';
const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 Demo Lane',
        city: 'Demo',
        state: 'DE',
        country: 'Demo',
        lat: 1,
        lng: 1,
        name: 'Demo Spot',
        description: 'This spot is a test, you would not want to stay here I promise',
        price: 100,
        avgRating: 1,
        previewImage: "https://i0.wp.com/generic.wordpress.soton.ac.uk/digital-learning/wp-content/uploads/sites/321/2017/11/DEMO.png"
      },
      {
        ownerId: 2,
        address: '123 User1 Street',
        city: 'User One',
        state: 'UO',
        country: 'Userone',
        lat: 2,
        lng: 2,
        name: `Userone's spot`,
        description: `User one's house, it's not much but for $9.99 it's hard to beat`,
        price: 9.99,
        avgRating: 2,
        previewImage: "https://st.depositphotos.com/1206476/1424/i/450/depositphotos_14240863-stock-photo-old-wooden-shack.jpg"
      },
      {
        ownerId: 3,
        address: '222 User2 Place',
        city: 'User Two',
        state: 'UT',
        country: 'Usertwo',
        lat: 3,
        lng: 3,
        name: `Usertwo's spot`,
        description: `User two's house, a reasonably nice place for a reasonably nice price`,
        price: 79.99,
        avgRating: 3,
        previewImage: "https://www.thebalancemoney.com/thmb/90V3lz16a0ZiA1a4kQpyky_VqHw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/white-colored-house-with-blue-door-155283916-5c505acc46e0fb00018dec84.jpg"
      },
      {
        ownerId: 4,
        address: '333 User3 Place',
        city: 'User Three',
        state: 'UT',
        country: 'Userthree',
        lat: 4,
        lng: 4,
        name: `Userthree's spot`,
        description: `User three's house, a taste of luxury in the mountainside`,
        price: 129.99,
        avgRating: 4,
        previewImage: "https://www.sunset.com/wp-content/uploads/cozy-cabins-cathedral-mountain-lodge-bc-pr-0919-900x500.jpg"
      },
      {
        ownerId: 5,
        address: '444 User4 Road',
        city: 'User Four',
        state: 'UF',
        country: 'Userfour',
        lat: 5,
        lng: 5,
        name: `Userfour's spot`,
        description: `User four's house, the finest place you could ever wish to stay in`,
        price: 999.99,
        avgRating: 5,
        previewImage: "https://i.insider.com/54c7c30969bedd393a87fe20?width=1000&format=jpeg"
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spot';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Demo Spot', `Userone's spot`, `Usertwo's spot`, `Userthree's spot`, `Userfour's spot`] }
    }, {});
  }
};
