const Usuario = require('../models/Usuario');
const Inscrito = require('../models/Inscrito');
const bcrypt = require('bcryptjs');
const { Sequelize } = require('sequelize/dist');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const SECRET = process.env.SEGREDO;
const validar = require('./testaCPF.js');
function verificarToken(token, id){
  var resultado = true;
  jwt.verify(token, SECRET,(err, decoded)=>{
    if(!err)
    resultado = true;
    else
    resultado = false;
  });
    return resultado;
 }
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
     const inscritoAprovado = await Inscrito.findOne({where:{email1:email, aprovado:true}});
     if(inscritoAprovado){
     const hash = await bcrypt.hash(senha, 10);
     const usuario = await Usuario.create({
      email:email, senha:hash, nome: nome, cpf: cpf,
      telefone: telefone, endereco: endereco, professor:professor
     }).catch(err => { return err});

     return res.json(usuario);
   }
   else return res.json("nao autorizado a se cadastrar");
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
        if(validPass){
         const token = jwt.sign({id:usuario.id}, SECRET,{expiresIn:86400});
         await Usuario.update({
          token:token
        },
         {where:{id:usuario.id}}
         ).catch(err => { return err});
         const usuario1 = await Usuario.findOne({
          attributes: {exclude: ['senha']},
          where: {
            email:email
          }}).catch(err => { return err});
         return res.json(usuario1);
        }
    else
    return res.status(401).json("Nao Autorizado");
    }
    else
    return res.status(401).json("Nao Autorizado");
  },
  async logout(req, res){
  const token = req.headers['authorization'];
  const {id}= req.params;
  const verif = verificarToken(token, id);
  const usuario1 = await Usuario.findByPk(id).catch(err => { return err});
  if(verif && usuario1.token == token){
  const usuario = await Usuario.update({
    token: null
  },
   {where:{id:id}}
   ).catch(err => { return res.json("Erro ao se deslogar")});
  return res.json("Deslogado com sucesso");
  }
  else
  return res.json("Token invalido");
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
    const { nome, telefone, endereco } = req.body;
    const token = req.headers['authorization'];
    const verif = verificarToken(token, id);
    console.log(verif);
    const usuario = await Usuario.findByPk(id).catch(err => { return err});
    if(verif && usuario.token == token){
    const usuario1 = await Usuario.update({
      
      nome: nome, telefone: telefone, endereco: endereco
    },
     {where:{id:id}}
     ).catch(err => { return err});
    const usuario3 = await Usuario.findOne({
      attributes: {exclude: ['senha','token']},
      where: {
        id:id
      }}).catch(err => { return err});
    return res.json(usuario3);
  
  }
  else return res.json("Token invalido");
  }, 
   
};
