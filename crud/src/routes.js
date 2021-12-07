const express = require('express');
var routes = express.Router();
routes
.get('/', async function(req, res) {
   res.send('Usuario criado: 1');
})
.post('/', async function(req, res) {
 await Usuario.create({
        nome: req.body.nome,
        cpf: req.body.cpf,
        telefone: req.body.telefone
      }).then(data => {
      return res.json(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
});
routes
.get('/user/', async function(req, res) {
  res.send('Usuario criado:');
})
.put('/user/', async function(req, res) {
  res.send('Update the book');
})
.delete('/user/', async function(req, res) {
  res.send('Get a random book');
});
module.exports = routes;