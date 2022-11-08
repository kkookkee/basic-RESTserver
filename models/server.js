const express = require('express')
const cors = require('cors')
const app = express()

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        //middleware
        this.middlewares()
        this.routes()
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
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Corriendo en el puerto: ',this.port);
        })
    }
}

module.exports = Server;