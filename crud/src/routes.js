const express = require('express');
// const CarroController = require('./controllers/CarroController');
const UsuarioController = require('./controllers/UsuarioController')

var routes = express.Router();
routes
//users
.get('/usuarios',UsuarioController.getAll)

.get('/usuarios/:id', UsuarioController.getOne)
.post('/login', UsuarioController.login)
.post('/logout/:id', UsuarioController.logout)
.post('/usuarios', UsuarioController.store)

.delete('/usuarios/', UsuarioController.deleteOne)

.put('/usuarios/:id', UsuarioController.updateOne)
//carros
/*
.get('/carros',CarroController.getAll)

.get('/carros/:id', CarroController.getOne)

.post('/carros', CarroController.store)


.delete('/carros/:id', CarroController.deleteOne)

.put('/carros/:id', CarroController.updateOne)*/;
module.exports = routes;