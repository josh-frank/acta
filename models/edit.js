"use strict";

const { Model } = require( "sequelize" );

module.exports = ( sequelize, DataTypes ) => {
  class Edit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( models ) {
      Edit.belongsTo( models.Article, { foreignKey: "articleId", as: "article", onDelete: "CASCADE" } );
      Edit.belongsTo( models.User, { foreignKey: "userId", as: "user" } );
    }
  };
  Edit.init( {
    content: DataTypes.STRING,
    current: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: "Edit",
  } );
  return Edit;
};