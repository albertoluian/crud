const { Model, DataTypes } = require('sequelize');

class Registered extends Model {
   static init(sequelize){
      super.init({
         nome: DataTypes.STRING,
         nomeMae: DataTypes.STRING,
         nomePai: DataTypes.STRING,
         naturalidade: DataTypes.STRING,
         uf: DataTypes.STRING,
         nacionalidade: DataTypes.STRING,
         dataDeNascimento: DataTypes.STRING,
         estadoCivil: DataTypes.STRING,
         rg: DataTypes.STRING,
         expedidor: DataTypes.STRING,
         dataDeExpedicao: DataTypes.STRING,
         cpf:DataTypes.STRING,
         endereco:DataTypes.STRING,
         bairro: DataTypes.STRING,
         cep: DataTypes.STRING,
         cidade: DataTypes.STRING,
         telefoneResidencial: DataTypes.INTEGER,
         telefone: DataTypes.INTEGER,       
         email1: DataTypes.STRING,
         email2: DataTypes.STRING,
         cursoDeGraduacao1:DataTypes.STRING,
         instituicaoGrad1: DataTypes.STRING,
         conclusaoGrad1: DataTypes.INTEGER,
         cursoDeGraduacao2:DataTypes.STRING,
         instituicaoGrad2: DataTypes.STRING,
         conclusaoGrad2: DataTypes.INTEGER,
         cursoDeEspecializacao:DataTypes.STRING,
         instituicaoEsp: DataTypes.STRING,
         conclusaoEsp: DataTypes.INTEGER,
         linhaDePesquisa: DataTypes.STRING,
         tipoBolsa1: DataTypes.STRING,
         orgaoDeFomento1: DataTypes.STRING,
         periodo1: DataTypes.STRING,
         tipoBolsa2: DataTypes.STRING,
         orgaoDeFomento2: DataTypes.STRING,
         periodo2: DataTypes.STRING,
         disciplinaMonitoria1: DataTypes.STRING,
         departamentoMonit1: DataTypes.STRING,
         periodoMonit1:DataTypes.STRING,
         disciplinaMonitoria2: DataTypes.STRING,
         departamentoMonit2: DataTypes.STRING,
         periodoMonit2:DataTypes.STRING,
         trabalhara: DataTypes.BOOLEAN,
         exclusivo:DataTypes.BOOLEAN,
         concorreraABolsa:DataTypes.BOOLEAN,
         realizaraSemBolsa:DataTypes.BOOLEAN,
         foto:DataTypes.STRING,
         termo:DataTypes.STRING,
         taxaOuIsencao:DataTypes.STRING,
         identificacao:DataTypes.STRING,
         ComprovanteVotacao:DataTypes.STRING,
         historicoEscolar:DataTypes.STRING,
         documentosComprobatorios:DataTypes.STRING,
         reservista:DataTypes.STRING,
         vinculoUece:DataTypes.STRING,
         aprovado:DataTypes.BOOLEAN,
      },{
      sequelize
       }
      )

   }

}
module.exports = Registered;