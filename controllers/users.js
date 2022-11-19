const {response,request} = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario')
const { emailValido } = require('../helpers/dbValidator')


const usuariosGet = async(req = request, res = response) => {
    const {limit = 5, desde = 0} = req.query
 
    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find({estado:true})
            .skip(Number(desde))
            .limit(Number(limit))
    ])
    res.status(200).json({
        total,
        usuarios
    })
}
const usuariosPut = async(req = request, res = response) => {
    const {id} = req.params;
    const {_id,password,google,...rest} = req.body;
    if(password){
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password,salt)
    }
    const usuario = await Usuario.findByIdAndUpdate(id,rest)
    res.status(200).json({
        msg:'put api ',
        usuario
    })
}
const usuariosPost = async(req, res = response) => {
    const {nombre,correo,password,rol} = req.body
    const usuario = new Usuario({nombre,correo,password,rol})
  
    //bcryptjs
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password,salt)
    await usuario.save()

    res.status(200).json({
        msg:'post api',
        usuario
    })
}
const usuariosDelete = async(req, res = response) => {
    const {id} = req.params
    const userAuth = req.userAuth
    //await Usuario.findByIdAndDelete(id)
    res.status(403).json({
        msg:'delete api '
    })
}
const usuariosPatch = (req, res = response) => {
    res.status(403).json({
        msg:'patch api '
    })
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}