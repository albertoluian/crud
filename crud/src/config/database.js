require('dotenv/config');
process.env.PORT ?
module.exports = {
    dialect: process.env.DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    define:{
        timestamps: true,
        underscored: true,
    },
   }
   :
   module.exports = {
    dialect: process.env.DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    define:{
        timestamps: true,
        underscored: true,
        
    },
   }