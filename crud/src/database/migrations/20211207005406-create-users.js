'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios', {
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
          type: Sequelize.BIGINT,
          allowNull:false
      }, 
      telefone:{
          type: Sequelize.INTEGER,
          allowNull:false
      },
      endereco:{
          type: Sequelize.STRING,
          allowNull:false
      },
      created_at:{
          type: Sequelize.DATE,
          allowNull: false,

      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
    }
  })
     
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.dropTable('users');
    
  }
};
