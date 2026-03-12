const { DataTypes } = require("sequelize");
//aqui no estaba el sequelize, lo importamos desde el config
const sequelize = require("../config/sequelize.js");

const Libro = sequelize.define('Libros',{
    titulo:{ type:DataTypes.STRING(100) , allowNull:false },
    genero:{ type:DataTypes.STRING(50) , allowNull:false },
    fecha_publicacion:{ type:DataTypes.DATEONLY , allowNull:false },
    created_at:{type: DataTypes.DATE, allowNull:false },
});
module.exports = Libro;