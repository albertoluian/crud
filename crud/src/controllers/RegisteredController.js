const Registered = require('../models/Registered');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const { Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const { unlink } = require('node:fs/promises');
require('dotenv/config');
const SECRET = process.env.SEGREDO;
const validar = require('./testaCPF.js');
function verifyToken(token, id) {
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
        vinculoUece
      } = JSON.parse(req.body.dados);
      const registereds = await Registered.findOne({
        where: Sequelize.or(
          { email1: email1 }, { cpf: cpf }, { telefone: telefone }, { rg: rg },
        )
      }).catch(err => { throw new Error(err) });
      if (registereds){
     //   for(i in req.files)
     //  await unlink(req.files[i].path);
        return res.status(409).json({ error: "Dados ja cadastrados" });
      }
     /* cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
        secure: true
      });

      let arquivos = [null, null, null, null, null, null, null, null, null];
      await cloudinary.uploader.upload(req.files[0].path).then(result => {
        arquivos[0] = result.secure_url;
      }).catch(err => { throw new Error(err) });
      await unlink(req.files[0].path);

      for (i = 0; i < 8; i++) {
        if (sexo == 'F' && req.files[i + 1]) {
          //Verifica se tem o arquivo e o sexo é feminino
          await cloudinary.uploader.upload(req.files[i + 1].path).then(result => {
            if (i + 1 == 7) {
              //Se tiver o oitavo arquivo(index = 7), ele coloca
              //a url na última posição, pois a pessoa não possui reservista
              arquivos[i + 2] = result.secure_url;
            }
            else
              arquivos[i + 1] = result.secure_url;
          }).catch(err => { throw new Error(err) });
          await unlink(req.files[i + 1].path);
        }
        else if (sexo == 'M' && req.files[i + 1]) {
          //Verifica se tem o arquivo e o sexo é masculino
          await cloudinary.uploader.upload(req.files[i + 1].path).then(result => {
            arquivos[i + 1] = result.secure_url;
          }).catch(err => { throw new Error(err) });
          await unlink(req.files[i + 1].path);
        }
      }
      const foto = arquivos[0];
      const termo = arquivos[1];
      const taxaOuIsencao = arquivos[2];
      const identificacao = arquivos[3];
      const ComprovanteVotacao = arquivos[4];
      const historicoEscolar = arquivos[5];
      const documentosComprobatorios = arquivos[6];
      const reservista = arquivos[7];
      const vinculoUece = arquivos[8];
*/
      const registered = await Registered.create({
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
      return res.json("inscrito com sucesso!!!");


    }
    catch (e) {
      console.log(e);
      next(e);
    }
  },
  async getAll(req, res, next) {
    try {
      const token = req.headers['authorization'];
      const verif = verifyToken(token);
      if (verif) {
        const admin = await Admin.findOne({ where: { token: token } }).catch(err => { throw new Error(err) });
        if (admin) {
          const registereds = await Registered.findAll().catch(err => { throw new Error(err) });
          return res.json(registereds);
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
      const verif = verifyToken(token);
      const admin = await Admin.findOne({ where: { token: token } }).catch(err => { throw new Error(err) });
      if (verif && admin) {
        const registereds1 = await Registered.findOne({ where: { id: id } }).catch(err => { throw new Error(err) });
        if (registereds1) {
          const registereds = await Registered.update({ aprovado: true }, { where: { id: id } }).catch(err => { throw new Error(err) });
          return res.json(registereds);
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
  }

}