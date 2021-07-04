'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tagsProdutos', {
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      produtosId: {
        type:Sequelize.INTEGER,
        references:{
          model: 'Produto',
          key:'id',
        },
        onDelete: 'SET NULL'
      },
      tagsId: {
        type:Sequelize.INTEGER,
        references:{
          model: 'Tags',
          key:'id',
        },
        onDelete: 'SET NULL'
      }
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * 
     */
     await queryInterface.dropTable('tagsProdutos');
  }
};
