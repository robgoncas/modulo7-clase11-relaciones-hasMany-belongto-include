# Clase: Relaciones en Sequelize
Node.js + PostgreSQL

## Objetivo de la clase

Aprender a crear relaciones entre entidades utilizando Sequelize.

Durante esta clase construiremos dos ejemplos:

1. Usuarios y Mensajes
2. Autores y Libros

Con esto aprenderemos:

- hasMany
- belongsTo
- include (JOIN automático)
- consultas con relaciones

---

# 1. ¿Qué es una relación en una base de datos?

En una base de datos relacional las tablas pueden estar conectadas.

Ejemplo:

Un usuario puede escribir muchos mensajes.

usuario
id | nombre

mensaje
id | contenido | usuario_id

Esto se llama:

UNO A MUCHOS (One to Many)

1 usuario → muchos mensajes

---

# 2. Tipos de relaciones en Sequelize

Sequelize implementa las relaciones con métodos.

Los más comunes son:

hasMany → uno a muchos  
belongsTo → pertenece a  
hasOne → uno a uno  
belongsToMany → muchos a muchos

Ejemplo típico:
```js
Usuario.hasMany(Mensaje);
Mensaje.belongsTo(Usuario);
```
---

# 3. Modelo Usuario

models/Usuario.js

```javascript
const { DataTypes } = require("sequelize")
const sequelize = require("../sequelize")

const Usuario = sequelize.define("Usuario", {

    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }

})

module.exports = Usuario
```

---

# 4. Modelo Mensaje

models/Mensaje.js

```javascript
const { DataTypes } = require("sequelize")
const sequelize = require("../sequelize")

const Mensaje = sequelize.define("Mensaje", {

    contenido: {
        type: DataTypes.TEXT,
        allowNull: false
    }

})

module.exports = Mensaje
```

---

# 5. Definir la relación

Crear archivo:

models/relaciones.js

```javascript
const Usuario = require("./Usuario")
const Mensaje = require("./Mensaje")

Usuario.hasMany(Mensaje)

Mensaje.belongsTo(Usuario)

module.exports = {
    Usuario,
    Mensaje
}
```

Esto generará automáticamente una columna:

usuarioId

en la tabla mensajes.

---

# 6. Sincronizar las tablas

En app.js

```javascript
const sequelize = require("./sequelize")
const { Usuario, Mensaje } = require("./models/relaciones")

async function iniciarBD(){

    await sequelize.sync()

    console.log("Base de datos sincronizada")

}

iniciarBD()
```

Sequelize creará:

usuarios
mensajes

y agregará la foreign key.

---

# 7. Crear un usuario

```javascript
async function crearUsuario(){

    const usuario = await Usuario.create({

        nombre: "Roberto"

    })

    console.log(usuario)

}
```

---

# 8. Crear un mensaje asociado

```javascript
async function crearMensaje(){

    const mensaje = await Mensaje.create({

        contenido: "Hola mundo",
        UsuarioId: 1

    })

    console.log(mensaje)

}
```

Observa que usamos:

UsuarioId

Por ende tenemos que agregar este UsuarioId en el Modelo del mensaje Explicitamente

---

# 9. Obtener mensajes con su usuario

Aquí aparece el poder del ORM.

```javascript
async function obtenerMensajes(){

    const mensajes = await Mensaje.findAll({

        include: Usuario

    })

    console.log(JSON.stringify(mensajes, null, 2))

}
```

Esto internamente ejecuta un JOIN en SQL.

---

# 10. Obtener usuarios con sus mensajes

```javascript
async function obtenerUsuarios(){

    const usuarios = await Usuario.findAll({

        include: Mensaje

    })

    console.log(JSON.stringify(usuarios, null, 2))

}
```

Resultado:

usuario

↓

lista de mensajes

---

# 11. Segundo ejemplo: Autores y Libros

Vamos a implementar otra relación para reforzar el concepto.

Un autor puede escribir muchos libros.

autor
id | nombre

libro
id | titulo | autor_id

---

# 12. Modelo Autor

models/Autor.js

```javascript
const { DataTypes } = require("sequelize")
const sequelize = require("../sequelize")

const Autor = sequelize.define("Autores", {

    nombre: {
        type: DataTypes.STRING
    }

})

module.exports = Autor
```

---

# 13. Modelo Libro

models/Libro.js

```javascript
const { DataTypes } = require("sequelize")
const sequelize = require("../sequelize")

const Libro = sequelize.define("Libro", {

    titulo: {
        type: DataTypes.STRING
    }

})

module.exports = Libro
```

---

# 14. Definir relación Autor - Libro

En relaciones.js

```javascript
const Autor = require("./Autor")
const Libro = require("./Libro")

Autor.hasMany(Libro)

Libro.belongsTo(Autor)
```

Esto generará:

AutorId

en la tabla libros.

---

# 15. Crear autor

```javascript
async function crearAutor(){

    const autor = await Autor.create({

        nombre: "Gabriel Garcia Marquez"

    })

    console.log(autor)

}
```

---

# 16. Crear libro

```javascript
async function crearLibro(){

    const libro = await Libro.create({

        titulo: "Cien años de soledad",
        AutorId: 1

    })

    console.log(libro)

}
```

---

# 17. Obtener libros con su autor

```javascript
async function obtenerLibros(){

    const libros = await Libro.findAll({

        include: Autor

    })

    console.log(JSON.stringify(libros, null, 2))

}
```

---

# 18. Resumen

Relaciones implementadas:

Usuario → Mensajes  
Autor → Libros

Métodos utilizados:

hasMany  
belongsTo  
include  

Conceptos aprendidos:

clave foránea  
JOIN automático  
consultas con relaciones
