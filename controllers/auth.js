const { response, request, json } = require("express");
const { generarJWT } = require("../helpers/generarJWT");
const { verify } = require("../helpers/googleVerify");
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

const googleSignIn = async(req = request,res = response) => {
    const { id_token } = req.body;
    
    try {
        const { correo, nombre, img } = await verify( id_token );
        let usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        // Si el usuario en DB
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            usuario,
            token
        });
        
    } catch (error) {

        res.status(400).json({
            msg: 'Token de Google no es válido'
        })

    }
   
}
module.exports = {
    login,
    googleSignIn
}