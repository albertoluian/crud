/* const { Model, DataTypes } = require('sequelize');

class Carro extends Model {
   static init(sequelize){
      super.init({
         marca: DataTypes.STRING,
         cor:DataTypes.STRING,
         placa: DataTypes.STRING,
         temabs: DataTypes.BOOLEAN,
         ano: DataTypes.INTEGER,
      },{
      sequelize
       }
      )

   }
   static associate(models){
       this.belongsTo(models.Usuario, {foreignKey: 'usuario_id'})
   }

}
module.exports = Carro;*/