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
      email:{
        type: Sequelize.STRING,
        allowNull:false
    },
    senha:{
      type: Sequelize.STRING,
      allowNull:false
  },
      nome:{
          type: Sequelize.STRING,
          allowNull:false
      }, 
      cpf:{
          type: Sequelize.STRING,
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
      professor:{
        type: Sequelize.BOOLEAN,
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
