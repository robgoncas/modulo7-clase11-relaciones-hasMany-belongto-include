const { Sequelize } = require("sequelize")

const sequelize = new Sequelize( "bibliotecaORM2", "postgres", "postgres", 
    {host: "localhost",port: 5433, dialect: "postgres" });

module.exports = sequelize;