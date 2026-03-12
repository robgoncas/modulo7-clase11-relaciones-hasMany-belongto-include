const { DataTypes } = require("sequelize");
//aqui no estaba el sequelize, lo importamos desde el config
const sequelize = require("../config/sequelize.js");

const Autor = sequelize.define('Autores',{
    nombre:{ type:DataTypes.STRING(100) , allowNull:false },
    fecha_nacimiento:{ type:DataTypes.DATEONLY , allowNull:false },
    created_at:{type: DataTypes.DATE, allowNull:false },
});

module.exports = Autor;