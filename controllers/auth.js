const { response, request } = require("express");
const { generarJWT } = require("../helpers/generarJWT");
const Usuario = require("../models/usuario");

const login = async(req = request,res = response) => {
    const {correo,password} = req.body
    const user = await Usuario.findOne({correo:correo})
    //generar jwb
    const token = await generarJWT(user.id)
    try {
        res.status(200).json({
            user,
            token
        })
    } catch (error) {
        return res.json(error)
    }
    
}

module.exports = {
    login
}