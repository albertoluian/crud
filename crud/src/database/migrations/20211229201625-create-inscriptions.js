'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('inscritos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nome_mae: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nome_pai: {
        type: Sequelize.STRING,
        allowNull: false
      },
      naturalidade: {
        type: Sequelize.STRING,
        allowNull: false
      },
      uf: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nacionalidade: {
        type: Sequelize.STRING,
        allowNull: false
      },
      data_de_nascimento: {
        type: Sequelize.STRING,
        allowNull: false
      },
      estado_civil: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rg: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expedidor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      data_de_expedicao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false
      },
      endereco: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bairro: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false
      },
      telefone_residencial: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      telefone: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      email1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      curso_de_graduacao1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      instituicao_grad1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      conclusao_grad1: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      curso_de_graduacao2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      instituicao_grad2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      conclusao_grad2: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      curso_de_especializacao: {
        type: Sequelize.STRING,
        allowNull: true
      },
      instituicao_esp: {
        type: Sequelize.STRING,
        allowNull: true
      },
      conclusao_esp: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      linha_de_pesquisa: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo_bolsa1: {
        type: Sequelize.STRING,
        allowNull: true
      },
      orgao_de_fomento1: {
        type: Sequelize.STRING,
        allowNull: true
      },
      periodo1: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tipo_bolsa2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      orgao_de_fomento2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      periodo2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      disciplina_monitoria1: {
        type: Sequelize.STRING,
        allowNull: true
      },
      departamento_monit1: {
        type: Sequelize.STRING,
        allowNull: true
      },
      periodo_monit1: {
        type: Sequelize.STRING,
        allowNull: true
      },
      disciplina_monitoria2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      departamento_monit2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      periodo_monit2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      trabalhara: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      exclusivo: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      concorrera_a_bolsa: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      realizara_sem_bolsa: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      foto: {
        type: Sequelize.STRING,
        allowNull: false
      },
      termo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      taxa_ou_isencao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      identificacao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      comprovante_votacao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      historico_escolar: {
        type: Sequelize.STRING,
        allowNull: false
      },
      documentos_comprobatorios: {
        type: Sequelize.STRING,
        allowNull: false
      },
      reservista: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vinculo_uece: {
        type: Sequelize.STRING,
        allowNull: true
      },
      aprovado: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,

      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('inscritos');

  }
};
