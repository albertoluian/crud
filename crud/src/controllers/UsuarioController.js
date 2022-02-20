const Usuario = require('../models/Usuario');
const Inscrito = require('../models/Inscrito');
const bcrypt = require('bcryptjs');
const { Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const SECRET = process.env.SEGREDO;
const validar = require('./testaCPF.js');
const nodemailer = require('nodemailer');
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
   async store(req, res, next){
     try{
     const { email, senha, nome, cpf, telefone, endereco, professor } = req.body;
     const user = await Usuario.findOne({
     
      where: Sequelize.or(
        {email:email},{cpf:cpf},{telefone:telefone}
      )
    }).catch(err => { throw new Error (err)});
    const testedeCPF = validar.TestaCPF(cpf);
    if(testedeCPF){
    if(user){return res.status(409).json("credencial ja registrada")} 
    else{
     const inscritoAprovado = await Inscrito.findOne({where:{email1:email, aprovado:true}});
     if(inscritoAprovado){
     const hash = await bcrypt.hash(senha, 10);
     const usuario = await Usuario.create({
      email:email, senha:hash, nome: nome, cpf: cpf,
      telefone: telefone, endereco: endereco, professor:professor
     }).catch(err => { throw new Error (err)});
     let transport = nodemailer.createTransport({
    service: "gmail",
    auth:{
      user:process.env.GMAIL_USER,
      pass:process.env.GMAIL_PASS
    },
    tls:{
      rejectUnauthorized:false
    }
  });
  const token = jwt.sign({id:usuario.id}, SECRET,{expiresIn:86400});
  
    const usuario2 = await Usuario.update({
          token:token
        },
         {where:{id:usuario.id}
        }).catch(err => { throw new Error (err)});
  let mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Confirmar email - PPGCN",
    text: `\nPara confirmar o email, clique no link a seguir: http://localhost:${process.env.PORTA}/confirmarEmail/${usuario.id}/${token}`
  }
  transport.sendMail(mailOptions, function(err, success){
    if(err){
      throw new Error (err)
    }
    else
    return res.json("Foi enviado um email de confirmação, por favor cheque sua caixa de entrada!");
  })
  
    
   }
   else return res.status(403).json("nao autorizado a se cadastrar");
  }}
  else
   return res.status(400).json("CPF invalido");
  }
  catch(e){
    console.log(e);
    next(e);
  }},
  async reenviarEmail(req, res, next){
    try{
    const email = req.body.email;
    console.log(email);
    const usuario = await Usuario.findOne({where:{ email:email}}).catch(err => { throw new Error (err)});
    
    if (usuario){
    let transport = nodemailer.createTransport({
      service: "gmail",
      auth:{
        user:process.env.GMAIL_USER,
        pass:process.env.GMAIL_PASS
      },
      tls:{
        rejectUnauthorized:false
      }
    });
    const token = jwt.sign({id:usuario.id}, SECRET,{expiresIn:86400});
    
      const usuario2 = await Usuario.update({
            token:token
          },
           {where:{id:usuario.id}
          }).catch(err => { throw new Error (err)});
    let mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Confirmar email - PPGCN",
      text: `\nPara confirmar o email, clique no link a seguir: http://localhost:${process.env.PORTA}/confirmarEmail/${usuario.id}/${token}`
    }
    transport.sendMail(mailOptions, function(err, success){
      if(err){
        throw new Error (err)
      }
      else
      return res.json("Foi enviado um email de confirmação, por favor cheque sua caixa de entrada!");
    })}
    else{
      return res.status(404).json("Usuario nao encontrado");
    }
  }
  catch(e){
    console.log(e);
    next(e);
  }},
  async confirmarEmail(req, res, next){
    try{
    const { id, token } = req.params;
    const verif = verificarToken(token);
    if(verif){
    const usuario = await Usuario.findOne({where:{id:id, token: token}}).catch(err => { throw new Error (err)});
    if(usuario){
      const usuario1 = await Usuario.update({
       confirmado:true,
      },
       {where:{id:id}}
       ).catch(err => { throw new Error (err)});
       return res.json("Email confimado com sucesso!!!");
     
    }
    else return res.status(404).json("Usuario nao encontrado");
  }
  else return res.status(401).json("Nao autorizado, token invalido");
}
catch(e){
  console.log(e);
  next(e);
}},
   async login(req, res, next){
     try{
    const { email, senha } = req.body;
    
    const usuario = await Usuario.findOne({
     
      where: {
        email:email
      }
    }).catch(err => { throw new Error (err)});
    if(usuario){
      const validPass = await bcrypt.compare(senha, usuario.senha)
        if(validPass){
          if(usuario.confirmado){
         const token = jwt.sign({id:usuario.id}, SECRET,{expiresIn:86400});
         await Usuario.update({
          token:token
        },
         {where:{id:usuario.id}}
         ).catch(err => { throw new Error (err)});
         const usuario1 = await Usuario.findOne({
          attributes: {exclude: ['senha']},
          where: {
            email:email
          }}).catch(err => { throw new Error (err)});
         return res.json(usuario1);
        }
      else
    return res.status(401).json("Confirme seu email.")
  }
    else
    return res.status(401).json("Nao Autorizado");
    }
    else
    return res.status(401).json("Nao Autorizado");
  }
  catch(e){
    console.log(e);
    next(e);
  }},
  async logout(req, res, next){
    try{
  const token = req.headers['authorization'];
  const {id}= req.params;
  const verif = verificarToken(token, id);
  const usuario1 = await Usuario.findByPk(id).catch(err => { throw new Error (err)});
  if(usuario1){
  if(verif && usuario1.token == token){
  const usuario = await Usuario.update({
    token: null
  },
   {where:{id:id}}
   ).catch(err => { throw new Error (err)});
  return res.json("Deslogado com sucesso");
  }
  else
  return res.status(401).json("Token invalido");
  }
  else return res.status(404).json("Usuario invalido");
}
catch(e){
  console.log(e);
  next(e);
}},
   async getAll(req, res, next){
     try{
    const usuario = await Usuario.findAll({attributes: {exclude: ['senha']},}).catch(err => { throw new Error (err)});

    return res.json(usuario);
  }
  catch(e){
    console.log(e);
    next(e);
  }},
  async getOne(req, res, next){
    try{
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id).catch(err => { throw new Error (err)});
   
    return res.json(usuario);
  }
  catch(e){
    console.log(e);
    next(e);
  }
  },
  async deleteOne(req, res, next){
    try{
    const { email, senha } = req.body;
    
    const usuario = await Usuario.findOne({
     
      where: {
        email:email
      }
    }).catch(err => { throw new Error (err)});
    if(usuario){
      const validPass = await bcrypt.compare(senha, usuario.senha)
        if(validPass){
          const id = usuario.id;
          const user = await Usuario.destroy({where: {id:id}}).catch(err => { throw new Error (err)});
          return res.json(user);
        }
    
    else
    return res.status(401).json("Nao Autorizado");
    }
    else
    return res.status(401).json("Nao Autorizado");
    
  }
  catch(e){
    console.log(e);
    next(e);
  }},
  async updateOne(req, res, next){
    try{
    const { id } = req.params;
    const { nome, telefone, endereco } = req.body;
    const token = req.headers['authorization'];
    const verif = verificarToken(token, id);
    console.log(verif);
    const usuario = await Usuario.findByPk(id).catch(err => { throw new Error (err)});
    if(usuario){
    if(verif && usuario.token == token){
    const usuario1 = await Usuario.update({
      
      nome: nome, telefone: telefone, endereco: endereco
    },
     {where:{id:id}}
     ).catch(err => { throw new Error (err)});
    const usuario3 = await Usuario.findOne({
      attributes: {exclude: ['senha','token']},
      where: {
        id:id
      }}).catch(err => { throw new Error (err)});
    return res.json(usuario3);
  
  }
  else return res.status(403).json("Token invalido");
  }
else return res.status(404).json("Usuario invalido");
}
catch(e){
  console.log(e);
  next(e);
}}, 
async esqueciSenha(req, res, next) {
  try{
  const { email } = req.body;
  const usuario = await Usuario.findOne({where:{email: email}}).catch(err => { throw new Error (err)});
  if(!usuario)
  return res.status(404).json("Este email nao pertence a nenhum usuario");
  else{
  const randomstring = Math.random().toString(36).slice(-8);
  let transport = nodemailer.createTransport({
    service: "gmail",
    auth:{
      user:process.env.GMAIL_USER,
      pass:process.env.GMAIL_PASS
    },
    tls:{
      rejectUnauthorized:false
    }
  });
  const token = jwt.sign({id:usuario.id}, SECRET,{expiresIn:86400});
  
    const usuario2 = await Usuario.update({
          token:token
        },
         {where:{id:usuario.id}
        }).catch(err => { throw new Error (err)});
  let mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Recuperar senha - PPGCN",
    text: `Sua nova senha é ${randomstring}, após confirmar a senha, logue-se e altere sua senha\nPara confirmar a troca de senha clique no link a seguir: http://localhost:${process.env.PORTA}/confirmarSenha/${usuario.id}/${randomstring}/${token}`
  }
  transport.sendMail(mailOptions, function(err, success){
    if(err){
      throw new Error (err)
    }
    else
    return res.json("Email enviado");
  })
  }
}
catch(e){
  console.log(e);
  next(e);
}},
async confirmarSenha(req, res, next) {
  try{
  const {id, senha, token } = req.params;
  const verif = verificarToken(token);
  const usuario = await Usuario.findOne({where:{id:id}}).catch(err => { throw new Error (err)});
  if(usuario){
   if(usuario.token == token && verif ){
    const hash = await bcrypt.hash(senha, 10);
    const usuario1 = await Usuario.update({
     senha:hash,
    },
     {where:{id:id}}
     ).catch(err => { throw new Error (err)});
     return res.json("Senha atualizada com sucesso!!!");
   }
   else return res.status(403).json("Token invalido");

  }
  else return res.status(404).json("Usuario nao encontrado");
}
catch(e){
  console.log(e);
  next(e);
}},   
};
