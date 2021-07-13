'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    static associate(models) {
    }
  };
  Tags.init({
    tag: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tags;
};