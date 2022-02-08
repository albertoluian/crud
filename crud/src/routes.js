const express = require('express');
// const CarroController = require('./controllers/CarroController');
const UsuarioController = require('./controllers/UsuarioController')
const InscritoController = require('./controllers/InscritoController');
const AdminController = require('./controllers/AdminController');
const multer = require('multer')
const multerConfig = require('./config/multer')
var routes = express.Router();
routes
//users
.get('/usuarios',UsuarioController.getAll)

.get('/usuarios/:id', UsuarioController.getOne)
.get('/confirmarSenha/:id/:senha/:token', UsuarioController.confirmarSenha)
.post('/login', UsuarioController.login)
.post('/logout/:id', UsuarioController.logout)
.post('/usuarios', UsuarioController.store)
.post('/esqueciSenha', UsuarioController.esqueciSenha)
.delete('/usuarios/', UsuarioController.deleteOne)

.put('/usuarios/:id', UsuarioController.updateOne)
//inscritos
.get('/inscritos', InscritoController.getAll)
.post('/inscritos', multer(multerConfig).array('file',4), InscritoController.store)
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