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
const existeMail = async(correo='') => {
    const checkEmail = await Usuario.findOne({correo});
    if(!checkEmail)  {
        throw new Error('Correo no registrado')
    }
}
const existeID = async(id='') => {
    const idUser = await Usuario.findById(id)
    if(!idUser)  {
        throw new Error('No existe ese id')
    }
}

const usuarioActivo = async(correo='') => {
    const activo = await Usuario.findOne({correo}).find({estado:true});
    if(activo.length === 0) {
        throw new Error('El usuario no esta activo')
    }
}
const passwordMatch = async(correo='',req) => {
    const usuario = await Usuario.findOne({correo:value})
    const validPass = bcrypt.compareSync(req.body.password,usuario.password)
    if(!validPass){
        throw new Error('La contraseña no coincide')
    }
}

module.exports = {
    esRolValido,
    emailValido,
    existeID,
    existeMail,
    usuarioActivo,
    passwordMatch
}