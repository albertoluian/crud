const { Model, DataTypes } = require('sequelize');

class User extends Model {
   static init(sequelize){
      super.init({
         email:{
            type: DataTypes.STRING,
            unique: {
               name: 'email',
               msg: 'Email ja registrado.'
             }
         },
         senha:DataTypes.STRING,
         nome: DataTypes.STRING,
         cpf:DataTypes.STRING,
         telefone: DataTypes.INTEGER,
         endereco:DataTypes.STRING,
         professor:DataTypes.BOOLEAN,
         token: DataTypes.STRING,
         confirmado: DataTypes.BOOLEAN
      },{
      sequelize
       }
      )

   }
 //  static associate(models){
  //    this.hasMany(models.Carro, {foreignKey: 'usuario_id'})
 // }

}
module.exports = User;