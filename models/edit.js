'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Edit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Edit.init({
    content: DataTypes.STRING,
    current: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Edit',
  });
  return Edit;
};