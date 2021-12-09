const express = require('express');
const CarroController = require('./controllers/CarroController');
const UsuarioController = require('./controllers/UsuarioController')

var routes = express.Router();
routes
.get('/usuarios',UsuarioController.getAll)

.post('/usuarios', UsuarioController.store)

.get('/carros',CarroController.getAll)

.post('/carros', CarroController.store)

.get('/usuarios/:id', UsuarioController.getOne)
.get('/carros/:id', CarroController.getOne)
.delete('/carros/:id', CarroController.deleteOne)
;
/*
.put('/usuarios/', async function(req, res) {
  res.send('Update the book');
})
.delete('/usuarios/', async function(req, res) {
  res.send('Get a random book');
});*/
module.exports = routes;