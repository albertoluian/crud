'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.createTable('carro', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull:false,
            primaryKey: true
        },
        marca:{
            type: Sequelize.STRING,
            allowNull:false
        }, 
        cor:{
            type: Sequelize.STRING,
            allowNull:false
        }, 
        
        placa:{
            type: Sequelize.STRING,
            allowNull:false
        },
        hasABS:{
            type: Sequelize.BOOLEAN,
            allowNull:false
        },
        ano:{
            type: Sequelize.INTEGER,
            allowNull:false
        }
    
    });
    
  },

  down: async (queryInterface, Sequelize) => {
    
      await queryInterface.dropTable('cars');
     
  }
};
