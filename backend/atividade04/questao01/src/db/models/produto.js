'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Produto.hasMany(models.Tags, {foreignKey: 'tagsId'});
    }
  };
  Produto.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    preço: DataTypes.INTEGER,
    tagsId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Produto',
  });
  return Produto;
};