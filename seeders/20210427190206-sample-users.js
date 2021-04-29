"use strict";

module.exports = {
  up: async ( queryInterface, Sequelize ) => {
    return await queryInterface.bulkInsert( "Users", [
      { username: "josh", password: "123", createdAt: new Date(), updatedAt: new Date() }
    ], {} );
  },

  down: async ( queryInterface, Sequelize ) => {
    return await queryInterface.bulkDelete( "Users", null, {} );
  }
};
