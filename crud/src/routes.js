const express = require('express');
// const CarroController = require('./controllers/CarroController');
const UsuarioController = require('./controllers/UsuarioController')
const InscritoController = require('./controllers/InscritoController');
const AdminController = require('./controllers/AdminController');
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
//inscritos
.get('/inscritos', InscritoController.getAll)
.post('/inscritos', InscritoController.store)
.post('/inscritos/aprovar/:id', InscritoController.aprove)
// admin
.post('/admin', AdminController.store)
.post('/admin/login', AdminController.login)
.post('/admin/logout/:id', AdminController.logout)
//carros
/*
.get('/carros',CarroController.getAll)

.get('/carros/:id', CarroController.getOne)

.post('/carros', CarroController.store)


.delete('/carros/:id', CarroController.deleteOne)

.put('/carros/:id', CarroController.updateOne)*/;
module.exports = routes;