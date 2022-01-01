const { Model, DataTypes } = require('sequelize');

class Admin extends Model {
   static init(sequelize){
      super.init({
         email:DataTypes.STRING,
         senha:DataTypes.STRING,
         token: DataTypes.STRING
      },{
      sequelize
       }
      )
    }

}
module.exports = Admin;