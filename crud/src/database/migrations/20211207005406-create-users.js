'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id:{
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull:false,
          primaryKey: true
      },
      nome:{
          type: Sequelize.STRING,
          allowNull:false
      }, 
      cpf:{
          type: Sequelize.INTEGER,
          allowNull:false
      }, 
      telefone:{
          type: Sequelize.INTEGER,
          allowNull:false
      },
      endereco:{
          type: Sequelize.STRING,
          allowNull:false
      }
  })
     
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.dropTable('users');
    
  }
};
