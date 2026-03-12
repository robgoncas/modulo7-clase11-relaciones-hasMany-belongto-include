const Usuario = require("./usuario.js");
const Mensaje = require("./mensaje.js");
const Libro = require("./libros.js");
const Autor = require("./autor.js");

//Definir la relacion de Uno a Muchos entre Usuario y Mensaje
Usuario.hasMany(Mensaje);
Mensaje.belongsTo(Usuario);


//Definir la relacion de Uno a Muchos entre Autor y Libro

//--Autor tiene muchos libros
//--Libro pertenece a un autor
//AutoreId es la clave foranea que se agrega a la tabla libros para relacionarla con autores
Autor.hasMany(Libro);
Libro.belongsTo(Autor);


//Esto me permite hacer un JOIN
//Requerir mensajes desde un usuario
//Requerir un usuario del mensaje


//Este Usuario y este Mensaje tienen una relacion, por lo tanto, al exportar ambos modelos, 
//se exportan con la relacion ya definida 
module.exports = {
    Usuario,
    Mensaje,
    Libro,
    Autor
};
