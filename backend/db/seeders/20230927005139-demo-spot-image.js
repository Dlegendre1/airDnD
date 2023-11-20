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
        url: 'https://i0.wp.com/generic.wordpress.soton.ac.uk/digital-learning/wp-content/uploads/sites/321/2017/11/DEMO.png',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://www.bhg.com/thmb/3Vf9GXp3T-adDlU6tKpTbb-AEyE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://www.livehome3d.com/assets/img/articles/design-house/how-to-design-a-house@2x.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://assetsio.reedpopcdn.com/skyrim-houses-how-to-buy-houses-in-whiterun-windhelm-riften-solitude-markarth-1477649051426.jpg?width=1920&height=1920&fit=bounds&quality=80&format.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://st.depositphotos.com/1206476/1424/i/450/depositphotos_14240863-stock-photo-old-wooden-shack.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://www.bhg.com/thmb/3Vf9GXp3T-adDlU6tKpTbb-AEyE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://www.livehome3d.com/assets/img/articles/design-house/how-to-design-a-house@2x.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://assetsio.reedpopcdn.com/skyrim-houses-how-to-buy-houses-in-whiterun-windhelm-riften-solitude-markarth-1477649051426.jpg?width=1920&height=1920&fit=bounds&quality=80&format.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://www.thebalancemoney.com/thmb/90V3lz16a0ZiA1a4kQpyky_VqHw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/white-colored-house-with-blue-door-155283916-5c505acc46e0fb00018dec84.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://www.bhg.com/thmb/3Vf9GXp3T-adDlU6tKpTbb-AEyE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://www.livehome3d.com/assets/img/articles/design-house/how-to-design-a-house@2x.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://assetsio.reedpopcdn.com/skyrim-houses-how-to-buy-houses-in-whiterun-windhelm-riften-solitude-markarth-1477649051426.jpg?width=1920&height=1920&fit=bounds&quality=80&format.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://www.sunset.com/wp-content/uploads/cozy-cabins-cathedral-mountain-lodge-bc-pr-0919-900x500.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://www.bhg.com/thmb/3Vf9GXp3T-adDlU6tKpTbb-AEyE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://www.livehome3d.com/assets/img/articles/design-house/how-to-design-a-house@2x.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://assetsio.reedpopcdn.com/skyrim-houses-how-to-buy-houses-in-whiterun-windhelm-riften-solitude-markarth-1477649051426.jpg?width=1920&height=1920&fit=bounds&quality=80&format.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.insider.com/54c7c30969bedd393a87fe20?width=1000&format=jpeg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://www.bhg.com/thmb/3Vf9GXp3T-adDlU6tKpTbb-AEyE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://www.livehome3d.com/assets/img/articles/design-house/how-to-design-a-house@2x.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://assetsio.reedpopcdn.com/skyrim-houses-how-to-buy-houses-in-whiterun-windhelm-riften-solitude-markarth-1477649051426.jpg?width=1920&height=1920&fit=bounds&quality=80&format.jpg',
        preview: false
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImage';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      preview: { [Op.in]: [true, false] }
    }, {});
  }
};
