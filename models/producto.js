const {Schema,model} = require('mongoose');
const productoSchema = Schema({
    nombre: {
        type: String,
        required: [true,'El nombre es olbigatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: {type:String},
    disponible : {
        type: Boolean,
        default:true
    },
    img: {type:String}

    
})

module.exports = model('Producto',productoSchema)