const { request, response } = require("express");
const { model } = require("mongoose");
const { subirArchivo } = require("../helpers/subirArchivo");
const Producto = require("../models/producto");
const Usuario = require("../models/usuario");
const path = require('path');
const fs = require("fs");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)


const cargarArchivo = async(req = request, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({msg:'No files were uploaded.'});
        return;
    }
    try {
        const resp = await subirArchivo(req.files)
        res.json({resp})
    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }
}

const actualizarImagen = async(req=request,res=response) =>{
    const {id,coleccion} = req.params
    let modelo
    switch(coleccion){
        case 'usuarios':
            console.log('Buscando usuario con id: ',id);
            modelo = await Usuario.findById(id)
            console.log('modelo ',modelo);
            if(!modelo){
                return res.status(400).json({msg:'No existe el usuario'})
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({msg:'No existe el producto'})
            }
            break;
        default: 
            return res.status(500).json({msg:'No valido'})
    }
    try {
        //borrar imagen previa
        console.log('imagen a eliminar ',modelo.img);
        if(modelo.img){
            const pathImagen = path.join(__dirname,'uploads',coleccion,modelo.img)
            if(fs.existsSync(pathImagen)){
                console.log('La ruta existe! Eliminando archivo');
                fs.unlinkSync(pathImagen)
            }
        }
        console.log('actualizando archivo');
        const nombre = await subirArchivo(req.files,coleccion)
        modelo.img = nombre
        await modelo.save()
        res.json(modelo)
    } catch (error) {
        res.json(error)
    }   
}

const mostrarImagen = async(req = request, res = response) => {
    const {id,coleccion} = req.params
    let modelo
    const pathImagenNotFound = path.join(__dirname,'../assets','no-image.jpg')
    switch(coleccion){
        case 'usuarios':
            console.log('Buscando usuario con id: ',id);
            modelo = await Usuario.findById(id)
            console.log('modelo ',modelo);
            if(!modelo){
                return res.sendFile(pathImagenNotFound)
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id)
            if(!modelo){
                return res.sendFile(pathImagenNotFound)
            }
            break;
        default: 
            return res.status(500).json({msg:'No valido'})
    }
    try {
        if(modelo.img){
            res.redirect(modelo.img)
        }
    } catch (error) {
        res.json(error)
    }   
}

const actualizarImagenCloudinary = async(req=request,res=response) =>{
    const {id,coleccion} = req.params
    let modelo
    switch(coleccion){
        case 'usuarios':
            console.log('Buscando usuario con id: ',id);
            modelo = await Usuario.findById(id)
            console.log('modelo ',modelo);
            if(!modelo){
                return res.status(400).json({msg:'No existe el usuario'})
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({msg:'No existe el producto'})
            }
            break;
        default: 
            return res.status(500).json({msg:'No valido'})
    }
    try {
        //borrar imagen previa
        console.log('imagen a eliminar ',modelo.img);
        if(modelo.img){
            const nombArr = modelo.img.split('/')
            const nombre = nombArr[nombArr.length -1]; 
            const [public_id] = nombre.split('.')
            cloudinary.uploader.destroy(public_id)
        }
        const {tempFilePath} = req.files.archivo
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
        //const nombre = await subirArchivo(req.files,coleccion)
        modelo.img = secure_url
        await modelo.save()
        res.json(secure_url)
    } catch (error) {
        res.json(error)
    }   
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}