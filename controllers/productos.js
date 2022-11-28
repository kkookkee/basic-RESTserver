const { request, response } = require("express");
const producto = require("../models/producto");
const obtenerProductos = async(req = request,res = response) => {
    const productos = await producto.find().populate('usuario').populate('categoria')
    if(!productos){
        return res.status(400).json({
            msg:'No hay productos que mostrar'
        })
    }
    return res.status(200).json({
        productos
    })
}
const obtenerProducto = async(req = request,res = response) => {
    const {id} = req.params
    const productoID = await producto.findById(id).populate('usuario').populate('categoria')
    if(!productoID){
        return res.status(400).json({
            msg:'No hay productos que mostrar'
        })
    }
    return res.status(200).json({
        productoID
    })
}
const crearProducto = async(req = request,res=response) => {
    const nombre = req.body.nombre.toUpperCase()
    const {precio,categoria,descripcion,disponible} = req.body
    const productoDB = await producto.findOne({nombre})
    if(productoDB!==null){
        return res.status(400).json({
            msg:'Producto ya existente'
        })
    }
    const data = {
        nombre,
        precio,
        categoria: categoria,
        usuario: req.userAuth._id,
        descripcion,
        disponible,
    }
    const productoSave = new producto(data)
    productoSave.save()
    return res.status(201).json(productoSave)
}
const actualizarProducto = async(req = request,res=response) => {
    const nombre = req.body.nombre.toUpperCase()
    const {precio,categoria,descripcion,disponible} = req.body
    const {id} = req.params
    const productoDB = await producto.findByIdAndUpdate(id,{nombre,precio,categoria,descripcion,disponible})
    if(productoDB!==null){
        return res.status(200).json({
            productoDB
        })
    }
    return res.status(400).json({
        msg:'producto no encontrado'
    })
}
const deleteProducto = async(req = request,res=response) => {
    const {id} = req.params
    const productoDB = await producto.findByIdAndUpdate(id,{estado:false})
    if(productoDB!==null){
        return res.status(200).json({
            productoDB
        })
    }
    return res.status(400).json({
        msg:'producto no encontrado'
    })
}
module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    deleteProducto
}