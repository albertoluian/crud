const Sequelize = require('sequelize');
const database = require('../db');

const Usuario = database.define('usuario', {
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
module.exports = Usuario;