const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.js");

const Usuario = sequelize.define("Usuarios", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Usuario