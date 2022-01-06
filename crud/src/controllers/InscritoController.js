const Inscrito = require('../models/Inscrito');
const Admin = require('../models/Admin');
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
       const {
        nome,
        nomeMae,
        nomePai,
        naturalidade,
        uf,
        nacionalidade,
        dataDeNascimento,
        estadoCivil,
        rg,
        expedidor,
        dataDeExpedicao,
        cpf,
        endereco,
        bairro,
        cep,
        cidade,
        telefoneResidencial,
        telefone,       
        email1,
        email2,
        cursoDeGraduacao1,
        instituicaoGrad1,
        conclusaoGrad1,
        cursoDeGraduacao2,
        instituicaoGrad2,
        conclusaoGrad2,
        cursoDeEspecializacao,
        instituicaoEsp,
        conclusaoEsp,
        linhaDePesquisa,
        tipoBolsa1,
        orgaoDeFomento1,
        periodo1,
        tipoBolsa2,
        orgaoDeFomento2,
        periodo2,
        disciplinaMonitoria1,
        departamentoMonit1,
        periodoMonit1,
        disciplinaMonitoria2,
        departamentoMonit2,
        periodoMonit2,
        trabalhara,
        exclusivo,
        concorreraABolsa,
        realizaraSemBolsa,
        } = req.body;
     
       const inscritos = await Inscrito.findOne({where:Sequelize.or(
         {email1:email1},{cpf:cpf},{telefone:telefone},{rg:rg},
         )
        }).catch(err => { return res.status(500).json(err)});
       if(inscritos){
         return res.status(409).json("Dados ja cadastrados");
       }
       else{
       const inscrito = await Inscrito.create({nome,
        nomeMae,
        nomePai,
        naturalidade,
        uf,
        nacionalidade,
        dataDeNascimento,
        estadoCivil,
        rg,
        expedidor,
        dataDeExpedicao,
        cpf,
        endereco,
        bairro,
        cep,
        cidade,
        telefoneResidencial,
        telefone,       
        email1,
        email2,
        cursoDeGraduacao1,
        instituicaoGrad1,
        conclusaoGrad1,
        cursoDeGraduacao2,
        instituicaoGrad2,
        conclusaoGrad2,
        cursoDeEspecializacao,
        instituicaoEsp,
        conclusaoEsp,
        linhaDePesquisa,
        tipoBolsa1,
        orgaoDeFomento1,
        periodo1,
        tipoBolsa2,
        orgaoDeFomento2,
        periodo2,
        disciplinaMonitoria1,
        departamentoMonit1,
        periodoMonit1,
        disciplinaMonitoria2,
        departamentoMonit2,
        periodoMonit2,
        trabalhara,
        exclusivo,
        concorreraABolsa,
        realizaraSemBolsa,})
       .catch(err =>{ return res.status(500).json(err); });
       return res.json(inscrito);
   }},
  async getAll(req, res){
    const token = req.headers['authorization'];
    const verif = verificarToken(token);
    const admin = await Admin.findOne({where:{token:token}}).catch(err => {return res.status(500).json(err)});
    if(verif && admin.token == token){
    const inscritos = await Inscrito.findAll().catch(err =>{ return res.status(500).json(err)});
    return res.json(inscritos);
    }
    else
    return res.status(403).json("Token invalido");
  },
async aprove(req, res){
  const {id} = req.params;
  const token = req.headers['authorization'];
  const verif = verificarToken(token);
  const admin = await Admin.findOne({where:{token:token}}).catch(err => {return res.status(500).json(err)});
  if(verif && admin.token == token){
    const inscritos1 = await Inscrito.findOne({where:{id:id}}).catch(err=>{return res.status(500).json(err)});
  if(inscritos1){
  const inscritos = await Inscrito.update({aprovado:true},{where:{id:id}}).catch(err =>{ return res.status(500).json(err)});
  return res.json(inscritos);
}
else
return res.status(404).json("nao existe inscrito com tal id");
}
  else
  return res.status(403).json("Token invalido");
}
}