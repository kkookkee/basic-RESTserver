const { request, response } = require("express");

const validarRol = (req = request,res=response,next) => {
    const user = req.userAuth
    if(!user){
        throw new Error('Usuario inexistente')
    }
    if(user.rol!=='Admin'){
        throw new Error('El usuario no tiene rol de administrador')
    }
    next()
}

const tieneRol = (...roles) => {
    return (req=request,res=response,next) => {
        //todo validar req usuario existe y comparar rol 
        if(!req.userAuth){
            return res.status(401).json({
                msg:'El usuario no existe',
            })
        }
        if(!roles.includes(req.userAuth.rol)){
            return res.status(200).json({
                msg:'El usuario no tiene rol valido',
            })
        }
        next()
    }
}

module.exports = {
    validarRol,
    tieneRol
}