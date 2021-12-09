const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Carro = require('../models/Carro');
const connection = new Sequelize(dbConfig);
const Usuario = require('../models/Usuario');
Carro.init(connection);
Usuario.init(connection);
Carro.associate(connection.models);
module.exports = connection;