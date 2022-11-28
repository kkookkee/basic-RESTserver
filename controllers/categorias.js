const { request, response } = require("express");
const { findByIdAndUpdate } = require("../models/categoria");
const categoria = require("../models/categoria");

//obtener categorias populate
const obtenerCategorias = async(req=request,res=response)=>{
    const categorias = await categoria.find().populate('usuario')
    console.log('catetorias' , categorias);
    return res.status(200).json({
        categorias
    })
}
//obtener categoria
const obtenerCategoria = async(req=request, res=response)=>{
    const {id} = req.params
    console.log(id);
    const categoriaID = await categoria.findById(id)
    if(!categoriaID){
        return res.status(400).json({
            msg:'Categoria no encontrada'
        })
    }
    return res.status(200).json({
        categoriaID
    })
}
//actualizar categoria nombre
const actualizarNombreCategoria = async(req=request,res=response)=>{
    const {id} = req.params
    const nombre = req.body.nombre.toUpperCase()
    const categoriaActualizada = await categoria.findByIdAndUpdate(id,{nombre})
    console.log(categoriaActualizada);
    if(!categoriaActualizada){
        return res.status(400).json({
            msg:'Categoria no encontrada'
        })
    }
    return res.status(200).json({
        categoriaActualizada
    })
}
//borrar categoria 
const deleteCategoria = async(req=request,res=response)=>{
    const {id} = req.params
    const categoriaBorrada = await categoria.findByIdAndUpdate(id,{estado:false})
    if(!categoriaBorrada){
        return res.status(400).json({
            msg:'Categoria no encontrada'
        })
    }
    return res.status(200).json({
        categoriaBorrada
    })
}
const crearCategoria = async(req = request,res = response) => {
    const nombre = req.body.nombre.toUpperCase()
    console.log('nombre categoria',nombre);
    const categoriaDB = await categoria.findOne({nombre})
    console.log(categoriaDB);
    if(categoriaDB!==null){
        return res.status(400).json({
            msg:'Categoria ya existente'
        })
    }
    const data = {
        nombre,
        usuario: req.userAuth._id
    }
    const categoriaSave = new categoria(data)
    categoriaSave.save()
    return res.status(201).json(categoriaSave)
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarNombreCategoria,
    deleteCategoria
}