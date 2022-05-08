const User = require('../models/User');
const Registered = require('../models/Registered');
const bcrypt = require('bcryptjs');
const { Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const SECRET = process.env.SEGREDO;
const validar = require('./testaCPF.js');
const nodemailer = require('nodemailer');

function verifyToken(token, id){
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
     const user = await User.findOne({
     
      where: Sequelize.or(
        {email:email},{cpf:cpf},{telefone:telefone}
      )
    }).catch(err => { throw new Error (err)});
    const testedeCPF = validar.TestaCPF(cpf);
    if(testedeCPF){
    if(user){return res.status(409).json("credencial ja registrada")} 
    else{
     const aprovedRegistered = await Registered.findOne({where:{email1:email, aprovado:true}});
     if(aprovedRegistered){
     const hash = await bcrypt.hash(senha, 10);
     const user = await User.create({
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
  const token = jwt.sign({id:user.id}, SECRET,{expiresIn:86400});
  
    const user2 = await User.update({
          token:token
        },
         {where:{id:user.id}
        }).catch(err => { throw new Error (err)});
  let mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Confirmar email - PPGCN",
    text: `\nPara confirmar o email, clique no link a seguir: http://localhost:${process.env.PORTA}/confirmarEmail/${user.id}/${token}`
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
    const user = await User.findOne({where:{ email:email}}).catch(err => { throw new Error (err)});
    
    if (user){
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
    const token = jwt.sign({id:user.id}, SECRET,{expiresIn:86400});
    
      const user2 = await User.update({
            token:token
          },
           {where:{id:user.id}
          }).catch(err => { throw new Error (err)});
    let mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Confirmar email - PPGCN",
      text: `\nPara confirmar o email, clique no link a seguir: http://localhost:${process.env.PORTA}/confirmarEmail/${user.id}/${token}`
    }
    transport.sendMail(mailOptions, function(err, success){
      if(err){
        throw new Error (err)
      }
      else
      return res.json("Foi enviado um email de confirmação, por favor cheque sua caixa de entrada!");
    })}
    else{
      return res.status(404).json("usuario nao encontrado");
    }
  }
  catch(e){
    console.log(e);
    next(e);
  }},
  async confirmarEmail(req, res, next){
    try{
    const { id, token } = req.params;
    const verif = verifyToken(token);
    if(verif){
    const user = await User.findOne({where:{id:id, token: token}}).catch(err => { throw new Error (err)});
    if(user){
      const user1 = await User.update({
       confirmado:true,
      },
       {where:{id:id}}
       ).catch(err => { throw new Error (err)});
       return res.json("Email confimado com sucesso!!!");
     
    }
    else return res.status(404).json("usuario inexistente ou token invalido");
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
    
    const user = await User.findOne({
     
      where: {
        email:email
      }
    }).catch(err => { throw new Error (err)});
    if(user){
      const validPass = await bcrypt.compare(senha, user.senha)
        if(validPass){
          if(user.confirmado){
         const token = jwt.sign({id:user.id}, SECRET,{expiresIn:86400});
         await User.update({
          token:token
        },
         {where:{id:user.id}}
         ).catch(err => { throw new Error (err)});
         const user1 = await User.findOne({
          attributes: {exclude: ['senha']},
          where: {
            email:email
          }}).catch(err => { throw new Error (err)});
         return res.json(user1);
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
  const verif = verifyToken(token, id);
  const user1 = await User.findByPk(id).catch(err => { throw new Error (err)});
  if(user1){
  if(verif && user1.token == token){
  const user = await User.update({
    token: null
  },
   {where:{id:id}}
   ).catch(err => { throw new Error (err)});
  return res.json("Deslogado com sucesso");
  }
  else
  return res.status(401).json("Token invalido");
  }
  else return res.status(404).json("usuario invalido");
}
catch(e){
  console.log(e);
  next(e);
}},
   async getAll(req, res, next){
     try{
    const user = await User.findAll({attributes: {exclude: ['senha']},}).catch(err => { throw new Error (err)});

    return res.json(user);
  }
  catch(e){
    console.log(e);
    next(e);
  }},
  async getOne(req, res, next){
    try{
    const { id } = req.params;
    const user = await User.findByPk(id).catch(err => { throw new Error (err)});
   
    return res.json(user);
  }
  catch(e){
    console.log(e);
    next(e);
  }
  },
  async deleteOne(req, res, next){
    try{
    const { email } = req.body;
    const token = req.headers['authorization'];
    const user = await User.findOne({
     
      where: {
        email:email
      }
    }).catch(err => { throw new Error (err)});
    if(user){
      const verif = verifyToken(token, user.id);
        if(verif && token == user.token){
          const id = user.id;
          const user = await User.destroy({where: {id:id}}).catch(err => { throw new Error (err)});
          return res.json(user);
        }
    else
    return res.status(403).json("Token invalido");
    }
    else
    return res.status(404).json("usuario nao encontrado");
    
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
    const verif = verifyToken(token, id);
    console.log(verif);
    const user = await User.findByPk(id).catch(err => { throw new Error (err)});
    if(user){
    if(verif && user.token == token){
    const user1 = await User.update({
      
      nome: nome, telefone: telefone, endereco: endereco
    },
     {where:{id:id}}
     ).catch(err => { throw new Error (err)});
    const user3 = await User.findOne({
      attributes: {exclude: ['senha','token']},
      where: {
        id:id
      }}).catch(err => { throw new Error (err)});
    return res.json(user3);
  
  }
  else return res.status(403).json("Token invalido");
  }
else return res.status(404).json("usuario invalido");
}
catch(e){
  console.log(e);
  next(e);
}}, 
async esqueciSenha(req, res, next) {
  try{
  const { email } = req.body;
  const user = await User.findOne({where:{email: email}}).catch(err => { throw new Error (err)});
  if(!user)
  return res.status(404).json("Este email nao pertence a nenhum user");
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
  const token = jwt.sign({id:user.id}, SECRET,{expiresIn:86400});
  
    const user2 = await User.update({
          token:token
        },
         {where:{id:user.id}
        }).catch(err => { throw new Error (err)});
  let mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Recuperar senha - PPGCN",
    text: `Sua nova senha é ${randomstring}, após confirmar a senha, logue-se e altere sua senha\nPara confirmar a troca de senha clique no link a seguir: http://localhost:${process.env.PORTA}/confirmarSenha/${user.id}/${randomstring}/${token}`
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
  const verif = verifyToken(token);
  const user = await User.findOne({where:{id:id}}).catch(err => { throw new Error (err)});
  if(user){
   if(user.token == token && verif ){
    const hash = await bcrypt.hash(senha, 10);
    const user1 = await User.update({
     senha:hash,
    },
     {where:{id:id}}
     ).catch(err => { throw new Error (err)});
     return res.json("Senha atualizada com sucesso!!!");
   }
   else return res.status(403).json("Token invalido");

  }
  else return res.status(404).json("usuario nao encontrado");
}
catch(e){
  console.log(e);
  next(e);
}},   
};
