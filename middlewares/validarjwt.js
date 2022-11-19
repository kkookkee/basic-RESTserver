const jwt = require('jsonwebtoken')
const {response, request} = require('express')
const Usuario = require('../models/usuario')

const validarJWT = async(req = request,res = response,next) => {
    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            msg: 'No existe un token'
        })
    }
    try {
        const {uid} = jwt.verify(token,process.env.SECRETKEY)
        req.uid = uid
        const usuario = await Usuario.findById(uid)
        if(!usuario){
            return res.status(401).json({
                msg: 'EL usuario no existe'
            })
        }
        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario con estado false'
            })
        }
        req.userAuth = usuario
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token invalido'
        })
    }
    

}

module.exports = {
    validarJWT
}