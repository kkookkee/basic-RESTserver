const {Router} = require('express')
const { check } = require('express-validator')
const { login } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validacionCampos')
const Role =  require('../models/role')
const {existeMail, usuarioActivo, comprobarPass} = require('../helpers/dbValidator')
const { response, request } = require("express");
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')





const router = Router()

router.post('/login',[
    check('password','La contraseña debe tener al menos 6 caracteres').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(existeMail),
    check('correo').custom(usuarioActivo),
    check('correo').custom(async(value, { req = request }) => {
        const usuario = await Usuario.findOne({correo:value})
        const validPass = bcrypt.compareSync(req.body.password,usuario.password)
        if(!validPass){
            throw new Error('La contraseña no coincide')
        }
    }),
    validarCampos
],login)



module.exports = router;