const express = require('express')
const cors = require('cors')
const app = express()

const {dbConnect} = require('../database/config')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.loginPath = '/api/auth'
        this.categoriasPath = '/api/categorias'
        this.productosPath = '/api/productos'
        this.buscarPath = '/api/buscar'
        //conexiondb
        this.conectDB()
        //middleware
        this.middlewares()
        //rutas
        this.routes()
    }

    async conectDB(){
        await dbConnect();
    }

    middlewares(){
        //CORS
        app.use(cors())
        //lectura y parseo del body
        this.app.use(express.json())
        //Directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.usuariosPath,require('../routes/user.routes'))
        this.app.use(this.loginPath,require('../routes/login.routes'))
        this.app.use(this.categoriasPath,require('../routes/categorias.routes'))
        this.app.use(this.productosPath,require('../routes/productos.routes'))
        this.app.use(this.buscarPath,require('../routes/buscar.routes'))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Corriendo en el puerto: ',this.port);
        })
    }
}

module.exports = Server;