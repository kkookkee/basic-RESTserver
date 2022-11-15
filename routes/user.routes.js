const {Router} = require('express')
const { check } = require('express-validator')
const Role =  require('../models/role')
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/users')
const { validarCampos } = require('../middlewares/validacionCampos')
const { esRolValido, emailValido, existeID } = require('../helpers/dbValidator')


const router = Router()

router.get('/', usuariosGet)
router.put('/:id', [
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeID),
    check('rol').custom(esRolValido),
    check('password','La contraseña debe tener al menos 6 caracteres').isLength({min:6}),
    validarCampos
], usuariosPut)
router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo','El correo no es valido').isEmail(),
    check('password','La contraseña debe tener al menos 6 caracteres').isLength({min:6}),
    //check('rol','No es un rol valido').isIn(['Admin','User']),
    check('rol').custom(esRolValido),
    check('correo').custom(emailValido),
    validarCampos
] ,usuariosPost)
router.delete('/:id', [
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeID),
    validarCampos
] ,usuariosDelete)
router.patch('/', usuariosPatch)
  





module.exports = router;