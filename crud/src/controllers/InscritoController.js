const Inscrito = require('../models/Inscrito');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const { Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');
const Formidable = require('formidable');
const cloudinary = require("cloudinary");
require('dotenv/config');
const SECRET = process.env.SEGREDO;
const validar = require('./testaCPF.js');
function verificarToken(token, id) {
  var resultado = true;
  jwt.verify(token, SECRET, (err, decoded) => {
    if (!err)
      resultado = true;
    else
      resultado = false;
  });
  return resultado;
}
module.exports = {
  async store(req, res, next) {
    try {
      const {
        nome,
        sexo,
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
        foto,
        termo,
        taxaOuIsencao,
        identificacao,
        ComprovanteVotacao,
        historicoEscolar,
        documentosComprobatorios,
        reservista,
        vinculoUece,
      } = JSON.parse(req.body.dados);
      
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
    cloudinary.uploader
      .upload(req.files[0].path)
      .then((result) => {
        console.log(result);
        res.status(200).json({
          message: "success",
          result,
        })}).catch(err =>{throw new Error(err) })
      const inscritos = await Inscrito.findOne({
        where: Sequelize.or(
          { email1: email1 }, { cpf: cpf }, { telefone: telefone }, { rg: rg },
        )
      }).catch(err => { throw new Error(err) });
      if (inscritos)
        return res.status(409).json({ error: "Dados ja cadastrados" });
      const inscrito = await Inscrito.create({
        nome,
        sexo,
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
        foto,
        termo,
        taxaOuIsencao,
        identificacao,
        ComprovanteVotacao,
        historicoEscolar,
        documentosComprobatorios,
        reservista,
        vinculoUece
      })
        .catch(err => { throw new Error(err) });
      return res.json("Inscrito com sucesso!!!");


    }
    catch (e) {
      console.log(e);
      next(e);
    }
  },
  async getAll(req, res, next) {
    try {
      const token = req.headers['authorization'];
      const verif = verificarToken(token);
      if (verif) {
        const admin = await Admin.findOne({ where: { token: token } }).catch(err => { throw new Error(err) });
        if (admin) {
          const inscritos = await Inscrito.findAll().catch(err => { throw new Error(err) });
          return res.json(inscritos);
        }
        else
          return res.status(403).json("Token invalido");
      }
      else
        return res.status(403).json("Token invalido");
    }
    catch (e) {
      console.log(e);
      next(e);
    }
  },
  async aprove(req, res, next) {
    try {
      const { id } = req.params;
      const token = req.headers['authorization'];
      const verif = verificarToken(token);
      const admin = await Admin.findOne({ where: { token: token } }).catch(err => { throw new Error(err) });
      if (verif && admin) {
        const inscritos1 = await Inscrito.findOne({ where: { id: id } }).catch(err => { throw new Error(err) });
        if (inscritos1) {
          const inscritos = await Inscrito.update({ aprovado: true }, { where: { id: id } }).catch(err => { throw new Error(err) });
          return res.json(inscritos);
        }
        else
          return res.status(404).json("nao existe inscrito com tal id");
      }
      else
        return res.status(403).json("Token invalido");
    }
    catch (e) {
      console.log(e);
      next(e);
    }
  },
  async upload(req, res, next) {
   
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
    cloudinary.uploader
      .upload(req.body.files)
      .then((result) => {
        console.log(result);
        res.status(200).json({
          message: "success",
          result,
        })}).catch(err =>{throw new Error(err) })
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}
