"use strict";

module.exports = {
  up: async ( queryInterface, Sequelize ) => {
    await queryInterface.createTable( "Edits", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      current: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      articleId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Articles",
          key: "id",
          as: "articleId"
        }
      }
    } );
  },
  down: async ( queryInterface, Sequelize ) => {
    await queryInterface.dropTable( "Edits" );
  }
};