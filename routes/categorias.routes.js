const {Router} = require('express')
const { check } = require('express-validator')
const { crearCategoria,obtenerCategorias, obtenerCategoria, actualizarNombreCategoria, deleteCategoria } = require('../controllers/categorias')
const { validarCampos } = require('../middlewares/validacionCampos')
const { validarJWT } = require('../middlewares/validarjwt')
const { validarRol } = require('../middlewares/validarRol')

const router = Router()
router.get('/',[],obtenerCategorias)
router.get('/:id',[
    check('id','No es un id de mongo').isMongoId(),
    validarCampos
],obtenerCategoria)
//crear categoria privado con token valido
router.post('/',[
    validarJWT,
    validarRol,
    check('nombre','Nombre obligatorio').notEmpty(),
    validarCampos
],crearCategoria)
//actualizar
router.put('/:id',[
    validarJWT,
    validarRol,
    check('id','No es un id de mongo').isMongoId(),
    check('nombre','Nombre obligatorio').notEmpty(),
    validarCampos
],actualizarNombreCategoria)
//borrar una categoria 
router.delete('/:id',[
    validarJWT,
    validarRol,
    check('id','No es un id de mongo').isMongoId(),
    validarCampos
],deleteCategoria)
module.exports = router