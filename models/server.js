const express = require('express')
const cors = require('cors')
const app = express()

const {dbConnect} = require('../database/config')
const fileUpload = require('express-fileupload')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.loginPath = '/api/auth'
        this.categoriasPath = '/api/categorias'
        this.productosPath = '/api/productos'
        this.buscarPath = '/api/buscar'
        this.uploadPath = '/api/upload'
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
        this.app.use(cors())
        //lectura y parseo del body
        this.app.use(express.json())
        //Directorio publico
        this.app.use(express.static('public'))
        //File upload
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp',
            createParentPath: true
        }))
    }

    routes(){
        this.app.use(this.usuariosPath,require('../routes/user.routes'))
        this.app.use(this.loginPath,require('../routes/login.routes'))
        this.app.use(this.categoriasPath,require('../routes/categorias.routes'))
        this.app.use(this.productosPath,require('../routes/productos.routes'))
        this.app.use(this.buscarPath,require('../routes/buscar.routes'))
        this.app.use(this.uploadPath,require('../routes/uploads.routes'))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Corriendo en el puerto: ',this.port);
        })
    }
}

module.exports = Server;