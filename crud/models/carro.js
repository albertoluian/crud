const Sequelize = require('sequelize');
const Usuario = require('./usuario');
const database = require('../db');

const Carro = database.define('carro', {
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

})
Carro.belongsTo(Usuario,{
       constraint:true,
       foreignKey:'id_usuario'
})
module.exports = Usuario;