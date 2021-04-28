"use strict";

const { Model } = require( "sequelize" );

module.exports = ( sequelize, DataTypes ) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( models ) {
      Article.hasOne( models.Edit, { foreignKey: "articleId", as: "currentEdit" } );
      Article.hasMany( models.Edit, { foreignKey: "articleId", as: "pastEdits" } );
    }
  };
  Article.init( {
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Article",
  } );
  return Article;
};