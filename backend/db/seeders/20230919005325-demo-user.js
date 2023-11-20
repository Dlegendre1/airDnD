'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.com',
        firstName: 'demo',
        lastName: 'user',
        username: 'demouser',
        hashedPassword: bcrypt.hashSync('demouser')
      },
      {
        email: 'user1@user.com',
        firstName: 'User1',
        lastName: 'User1',
        username: 'User1',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        email: 'user2@user.com',
        firstName: 'User2',
        lastName: 'User2',
        username: 'User2',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user3@user.com',
        firstName: 'User3',
        lastName: 'User3',
        username: 'User3',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user4@user.com',
        firstName: 'User4',
        lastName: 'User4',
        username: 'User4',
        hashedPassword: bcrypt.hashSync('password4')
      },

    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'User';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['demouser', 'User1User1', 'User2User2', 'User3User3', 'User4User4'] }
    }, {});
  }
};
