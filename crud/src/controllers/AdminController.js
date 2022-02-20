const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const { Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const SECRET = process.env.SEGREDO;
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
 module.exports ={
    async store(req, res, next){
     try{
        const {email, senha} = req.body;
        const hash = await bcrypt.hash(senha, 10);
        const admin = await Admin.create({
         email:email, senha:hash,
        }).catch(err => { throw new Error (err)});
        return res.json(admin);
      }
      catch(e){
        console.log(e);
        next(e);
      }
      },
 async login(req, res, next){
   try{
    const { email, senha } = req.body;
    
    const admin = await Admin.findOne({     
      where: {
        email:email
      }
    }).catch(err => { return err});
    if(admin){
      const validPass = await bcrypt.compare(senha, admin.senha)
        if(validPass){
         const token = jwt.sign({id:admin.id}, SECRET,{expiresIn:86400});
         await Admin.update({
          token:token
        },
         {where:{id:admin.id}}
         ).catch(err => { throw new Error (err)});
        
         return res.json(token);
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
  const admin1 = await Admin.findByPk(id).catch(err => { throw new Error (err)});
  if(admin1){
  if(verif && admin1.token == token){
  const admin = await Admin.update({
    token: null
  },
   {where:{id:id}}
   ).catch(err => { throw new Error (err)});
  return res.json("Deslogado com sucesso");
  }
  else
  return res.status(403).json("Token invalido");
  }
else res.status(404).json("Admin inexistente");
}
catch(e){
  console.log(e);
  next(e);
}},
}