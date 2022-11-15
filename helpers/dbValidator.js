const Role = require('../models/role')
const Usuario = require('../models/usuario')
const esRolValido = async(rol='') => {
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
        throw new Error('No registrado en BD')
    }
}
const emailValido = async(correo='') => {
    const checkEmail = await Usuario.findOne({correo});
    if(checkEmail)  {
        throw new Error('Correo ya registrado')
    }
}
const existeID = async(id='') => {
    const idUser = await Usuario.findById(id)
    if(!idUser)  {
        throw new Error('No existe ese id')
    }
}


module.exports = {
    esRolValido,
    emailValido,
    existeID
}