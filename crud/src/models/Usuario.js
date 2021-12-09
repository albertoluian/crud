const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
   static init(sequelize){
      super.init({
         nome: DataTypes.STRING,
         cpf:DataTypes.BIGINT,
         telefone: DataTypes.INTEGER,
         endereco:DataTypes.STRING
      },{
      sequelize
       }
      )

   }


}
module.exports = Usuario;