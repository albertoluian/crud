const Usuario = require('../models/Usuario')
module.exports = {
   async store(req, res){
     const { nome, cpf, telefone, endereco } = req.body;
     const usuario = await Usuario.create({
       nome: nome, cpf: cpf, telefone: telefone, endereco: endereco
     }).catch(err => { return err});

     return res.json(usuario);
   },
   async getAll(req, res){
    const usuario = await Usuario.findAll().catch(err => { return err});

    return res.json(usuario);
  },
  async getOne(req, res){
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id).catch(err => { return err});
   
    return res.json(usuario);
  },
  async deleteOne(req, res){
    const { id } = req.params;
    const usuario = await Usuario.destroy({where: {id:id}}).catch(err => { return err});
   
    return res.json(usuario);
  },
  async updateOne(req, res){
    const { id } = req.params;
    const { nome, cpf, telefone, endereco } = req.body;
    const usuario = await Usuario.update({
      nome: nome, cpf: cpf, telefone: telefone, endereco: endereco
    },
     {where:{id:id}}
     ).catch(err => { return err});
    return res.json(usuario);
  }
   
};