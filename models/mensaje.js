const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.js");

const Mensaje = sequelize.define('Mensajes',{
    contenido:{ type:DataTypes.STRING , allowNull:false },
    fecha:{type: DataTypes.DATE, allowNull:false },
    //Agregar explicitamente la clave foranea para la relacion entre mensaje y usuario
    // UsuarioId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: 'Usuarios', // nombre de la tabla a la que hace referencia
    //         key: 'id' // columna de la tabla referenciada
    //     },
    //     allowNull: false
    // }   
});

module.exports = Mensaje;