'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('admins', {
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
    token:{
      type: Sequelize.STRING,
      allowNull: true
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
    
     await queryInterface.dropTable('admins');
    
  }
};
