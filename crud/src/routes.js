const express = require('express');
const UserController = require('./controllers/UserController')
const RegisteredController = require('./controllers/RegisteredController');
const AdminController = require('./controllers/AdminController');
const multer = require('multer')
const multerConfig = require('./config/multer');
var routes = express.Router();
routes
//users
.get('/users',UserController.getAll)

.get('/users/:id', UserController.getOne)
.get('/confirmarSenha/:id/:senha/:token', UserController.confirmarSenha)
.get('/confirmarEmail/:id/:token', UserController.confirmarEmail)
.post('/reenviarEmail', UserController.reenviarEmail)
.post('/login', UserController.login)
.post('/logout/:id', UserController.logout)
.post('/users', UserController.store)
.post('/esqueciSenha', UserController.esqueciSenha)
.delete('/users/', UserController.deleteOne)
.put('/users/:id', UserController.updateOne)
//inscritos
.get('/inscritos', RegisteredController.getAll)
.post('/inscritos', multer(multerConfig).array('file',9), RegisteredController.store)
.post('/inscritos/aprovar/:id', RegisteredController.aprove)
// admin
.post('/admin', AdminController.store)
.post('/admin/login', AdminController.login)
.post('/admin/logout/:id', AdminController.logout)
module.exports = routes;