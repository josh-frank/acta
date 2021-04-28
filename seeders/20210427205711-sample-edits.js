"use strict";

module.exports = {
  up: async ( queryInterface, Sequelize ) => {
    return await queryInterface.bulkInsert( "Edits", [
      { content: "Article 1, test edit 1", current: false, createdAt: new Date( 2019, 4, 28 ), updatedAt: new Date(), articleId: 1 },
      { content: "Article 1, test edit 2", current: false, createdAt: new Date( 2020, 4, 28 ), updatedAt: new Date(), articleId: 1 },
      { content: "Article 1, test edit 3", current: true, createdAt: new Date(), updatedAt: new Date(), articleId: 1 },
      { content: "Article 2, test edit 1", current: false, createdAt: new Date(), updatedAt: new Date(), articleId: 2 },
      { content: "Article 2, test edit 2", current: true, createdAt: new Date(), updatedAt: new Date(), articleId: 2 }
    ], {} );
  },

  down: async ( queryInterface, Sequelize ) => {
    return await queryInterface.bulkDelete( "Edits", null, {} );
  }
};
