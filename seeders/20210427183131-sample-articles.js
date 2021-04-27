'use strict';

module.exports = {
  up: async ( queryInterface, Sequelize ) => {
    return await queryInterface.bulkInsert( "Articles", [
      { title: "Test1", createdAt: new Date(), updatedAt: new Date() },
      { title: "Test2", createdAt: new Date(), updatedAt: new Date() }
    ], {} );
  },
  down: async ( queryInterface, Sequelize ) => {
    return await queryInterface.bulkDelete( "Articles", null, {} );
  }
};
