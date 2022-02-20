const express = require('express');
const UsuarioController = require('./controllers/UsuarioController')
const InscritoController = require('./controllers/InscritoController');
const AdminController = require('./controllers/AdminController');
const multer = require('multer')
const multerConfig = require('./config/multer');
const Usuario = require('./models/Usuario');
var routes = express.Router();
routes
//users
.get('/usuarios',UsuarioController.getAll)

.get('/usuarios/:id', UsuarioController.getOne)
.get('/confirmarSenha/:id/:senha/:token', UsuarioController.confirmarSenha)
.get('/confirmarEmail/:id/:token', UsuarioController.confirmarEmail)
.post('/reenviarEmail', UsuarioController.reenviarEmail)
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
module.exports = routes;