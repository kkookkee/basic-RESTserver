const { request, response } = require("express");
const { isValidObjectId } = require("mongoose");
const Usuario = require('../models/usuario')
const Categoria = require('../models/categoria')
const Producto = require('../models/producto')
const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'producto',
    'roles'
];
const buscarUsuarios = async(termino = '',res=response) => {
    const esMongoID = isValidObjectId(termino)
    if(esMongoID){
        const usuarioBD = await Usuario.findById(termino)
        res.json({
            results:(usuarioBD) ? [usuarioBD] : []
        })
    }
    const regex = new RegExp(termino,'i')
    const usuarios = await Usuario.find({
        $or:[{nombre:regex},{correo:regex}],
        $and: [{estado:true}]
    })
    res.json({
        results:usuarios
    })
}
const buscarCategorias = async(termino = '',res=response) => {
    const esMongoID = isValidObjectId(termino)
    if(esMongoID){
        const categoriaBD = await Categoria.findById(termino)
        res.json({
            results:(categoriaBD) ? [categoriaBD] : []
        })
    }
    const regex = new RegExp(termino,'i')
    const categorias = await Categoria.find({
        $or:[{nombre:regex}],
        $and: [{estado:true}]
    })
    res.json({
        results:categorias
    })
}
const buscarProductos = async(termino = '',res=response) => {
    const esMongoID = isValidObjectId(termino)
    if(esMongoID){
        const productoDB = await Producto.findById(termino).populate('categoria','nombre')
        res.json({
            results:(productoDB) ? [productoDB] : []
        })
    }
    const regex = new RegExp(termino,'i')
    const productos = await Producto.find({
        $or:[{nombre:regex}],
        $and: [{estado:true}]
    }).populate('categoria','nombre')
    res.json({
        results:productos
    })
}
const buscar = (req = request, res = response) => {
    const {coleccion,termino} = req.params
    if(!coleccionesPermitidas.includes(coleccion)){
        res.status(404).json({
            msg:`Colecciones permitidas: ${coleccionesPermitidas}`,
        })
    }
    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino,res)
            break;
        case 'categoria':
            buscarCategorias(termino,res)
            break;
        case 'producto':
            buscarProductos(termino,res)
            break;
        default:
            res.status(500).json({
                msg: 'Se olvido hacer la busqueda'
            })
    }
}

module.exports = {
    buscar
}