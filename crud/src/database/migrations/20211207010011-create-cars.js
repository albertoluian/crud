'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.createTable('carros', {
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
        temabs:{
            type: Sequelize.BOOLEAN,
            allowNull:false
        },
        ano:{
            type: Sequelize.INTEGER,
            allowNull:false
        },
        usuario_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {model: 'usuarios', key:'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at:{
          type: Sequelize.DATE,
          allowNull: false,

      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
    }
    });
    
  },

  down: async (queryInterface, Sequelize) => {
    
      await queryInterface.dropTable('cars');
     
  }
};
