const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { Sequelize } = require('sequelize/dist');
const validar = require('./testaCPF.js');
module.exports = {
   async store(req, res){
     
     const { email, senha, nome, cpf, telefone, endereco, professor } = req.body;
     const user = await Usuario.findOne({
     
      where: Sequelize.or(
        {email:email},{cpf:cpf},{telefone:telefone}
      )
    }).catch(err => { return err});
    const testedeCPF = validar.TestaCPF(cpf);
    if(testedeCPF){
    if(user){return res.json("credencial ja registrada")} 
    else{
     const hash = await bcrypt.hash(senha, 10);
     const usuario = await Usuario.create({
      email:email, senha:hash, nome: nome, cpf: cpf,
      telefone: telefone, endereco: endereco, professor:professor
     }).catch(err => { return err});

     return res.json(usuario);
   }}
  else
   return res.json("CPF invalido");
  },
   async login(req, res){
    const { email, senha } = req.body;
    
    const usuario = await Usuario.findOne({
     
      where: {
        email:email
      }
    }).catch(err => { return err});
    if(usuario){
      const validPass = await bcrypt.compare(senha, usuario.senha)
        if(validPass)
        return res.json(usuario);
    
    else
    return res.status(401).json("Nao Autorizado");
    }
    else
    return res.status(401).json("Nao Autorizado");
  },
   async getAll(req, res){
    const usuario = await Usuario.findAll({attributes: {exclude: ['senha']},}).catch(err => { return err});

    return res.json(usuario);
  },
  async getOne(req, res){
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id).catch(err => { return err});
   
    return res.json(usuario);
  },
  async deleteOne(req, res){
    const { email, senha } = req.body;
    
    const usuario = await Usuario.findOne({
     
      where: {
        email:email
      }
    }).catch(err => { return err});
    if(usuario){
      const validPass = await bcrypt.compare(senha, usuario.senha)
        if(validPass){
          const id = usuario.id;
          const user = await Usuario.destroy({where: {id:id}}).catch(err => { return err});
          return res.json(user);
        }
    
    else
    return res.status(401).json("Nao Autorizado");
    }
    else
    return res.status(401).json("Nao Autorizado");
    
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