const sequelize = require("./config/sequelize.js");

//const mensaje = require("./models/mensaje.js");
//const usuario = require("./models/usuario.js");
const { Usuario, Mensaje, Autor, Libro } = require("./models/relaciones.js");

const conectarDB = async () => {
    try {
        //en vez de Poll.connect()
        await sequelize.authenticate()
        console.log("Conexión exitosa")
    } catch (error) {
        console.error("Error de conexión:", error)
    }
}

const sincronizarDB = async () => {
    try {
        await sequelize.sync()
        console.log("Tablas sincronizadas")
    } catch (error) {
        console.error(error)
    }
}

//Insertando un mensaje en la tabla mensajes
//A través del modelo mensaje
const crearMensaje = async () => {
    const nuevoMensaje = await mensaje.create(
        {
            contenido: "Hola, este es un mensaje desde un ORM",
            fecha: new Date()
        }
    );
    console.log(nuevoMensaje.toJSON());
}

const verTodosLosMensajes = async () => {
    const mensajes = await mensaje.findAll();
    console.table(mensajes.map(m => m.toJSON()));
}

const buscarMensaje = async (id) => {
    try {
        const mensajeEncontrado = await mensaje.findByPk(id);
        if (mensajeEncontrado) {
            console.log(mensajeEncontrado.toJSON());
        } else {
            console.log(`Mensaje con id ${id} no encontrado`);
        }
    } catch (error) {
        console.error("Error al buscar el mensaje:", error);
    }
}

const actualizarMensaje = async (id, nuevoContenido) => {
    try {
        //Buscamos el mensaje con FindByPK
        const mensajeAModificar = await mensaje.findByPk(id);
        //Verificamos que exista este mensaje
        if (!mensajeAModificar) {
            console.log(`Mensaje con id ${id} no encontrado`);
            return;
        }
        //Aplicamos el método update para actualizar el mensaje
        await mensajeAModificar.update(
            { contenido: nuevoContenido }
        );
        console.log("Mensaje actualizado:");
        console.log(mensajeAModificar.toJSON());

    } catch (error) {
        console.error("Error al actualizar el mensaje:", error);
    }
}

const eliminarMensaje = async (id) => {
    try {
        const mensajeAEliminar = await mensaje.findByPk(id);

        if (!mensajeAEliminar) {
            console.log(`Mensaje con id ${id} no encontrado`);
            return;
        }
        await mensajeAEliminar.destroy();
        console.log(`Mensaje con id ${id} eliminado`);
        console.log(mensajeAEliminar.toJSON());

    } catch (error) {
        console.log("Error al eliminar el mensaje:", error);
    }
}

const crearUsuario = async (nombre, email) => {
    try {

        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            throw new Error("El email ya está registrado");
        }
        const nuevoUsuario = await Usuario.create(
            {
                nombre,
                email
            });

        if (!nuevoUsuario) {
            throw new Error("Error al crear el usuario");
        }
        console.log(nuevoUsuario.toJSON());

    } catch (error) {
        console.error("Error al crear el usuario:", error);
    }
}

const crearMensajeConUsuario = async (contenido, UsuarioId) => {

    try {
        const usuario = await Usuario.findByPk(UsuarioId);

        if (!usuario) {
            throw new Error(`Usuario con id ${UsuarioId} no encontrado`);
        }

        const mensaje = await Mensaje.create({
            contenido,
            fecha: new Date(),
            UsuarioId
        });
        console.log("Mensaje creado con exito para el usuario: " + usuario.nombre);
        console.log(mensaje.toJSON());

    } catch (error) {
        console.error("Error al crear el mensaje con usuario:", error);
    }
}


async function obtenerMensajes() {
    try {
        const mensajes = await Mensaje.findAll({
            include: Usuario
        })

        if (mensajes.length === 0) {
            throw new Error("No se encontraron mensajes");
        }

        console.log(JSON.stringify(mensajes, null, 2));

    } catch (error) {
        console.log("Error al obtener los mensajes con usuarios:", error);
    }


}

const crearAutor = async (nombre, fecha_nacimiento) => {
    const nuevoAutor = await Autor.create(
        {
            nombre,
            fecha_nacimiento,
            created_at: new Date()
        }
    );
    console.log(nuevoAutor.toJSON());
}

const crearLibro = async (titulo, genero, fecha_publicacion, AutorId) => {
    try {
        const nuevoLibro = await Libro.create(
            {
                titulo,
                genero,
                fecha_publicacion,
                created_at: new Date(),
                AutoreId : AutorId
            }
        );

        console.log(nuevoLibro.toJSON());
    } catch (error) {
        console.error("Error al crear el libro:", error);
    }
}

const obtenerLibrosConAutores = async () => {
    try {
        const libros = await Libro.findAll({
            include: Autor
        });

        const autores = await Autor.findAll({
            include: Libro
        });
        console.log(JSON.stringify(libros, null, 2));
        console.log(JSON.stringify(autores, null, 2));

    } catch (error) {
        console.error("Error al obtener los libros con autores:", error);
    }
}

const main = async () => {
    await conectarDB();
    await sincronizarDB();
    // await crearAutor("Gabriel Garcia Marquez", "1927-03-06");
    // await crearAutor("Isabel Allende", "1942-08-02");
    // await crearLibro("Cien años de soledad", "Realismo mágico", "1967-05-30", 1);
    // await crearLibro("La casa de los espíritus", "Realismo mágico", "1982-01-01", 2);
    // await crearLibro("El amor en los tiempos del cólera", "Realismo mágico", "1985-01-01", 1);
    // await crearLibro("Eva Luna", "Realismo mágico", "1987-01-01", 2);
    // await obtenerLibrosConAutores();
    //await obtenerMensajes();
    // await crearUsuario("Roberto Perez", "r.perez@gmail.com");
    // await crearUsuario("Rodrigo Obando", "r.obando@gmail.com");
    // await crearMensajeConUsuario("Bye bye, este mensaje tiene un usuario asociado", 1);
    // await crearMensajeConUsuario("Bye bye, este mensaje tiene un usuario asociado", 2);


    // await crearMensaje();
    // await verTodosLosMensajes();
    // await buscarMensaje(2);
    // await actualizarMensaje(2, "Este es el nuevo contenido del mensaje id 222");
    // await eliminarMensaje(2);
}

main();