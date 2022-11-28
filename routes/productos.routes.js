const {Router} = require('express')
const { check } = require('express-validator')
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, deleteProducto } = require('../controllers/productos')
const { validarCampos } = require('../middlewares/validacionCampos')
const { validarJWT } = require('../middlewares/validarjwt')
const { validarRol } = require('../middlewares/validarRol')

const router = Router()
router.get('/',[],obtenerProductos)
router.get('/:id',[
    check('id','No es un id de mongo').isMongoId(),
    validarCampos
],obtenerProducto)

router.post('/',[
    validarJWT,
    validarRol,
    check('nombre','Nombre obligatorio').notEmpty(),
    check('categoria','Categoria debe ser un mongoid').isMongoId(),
    validarCampos
],crearProducto)
//actualizar
router.put('/:id',[
    validarJWT,
    validarRol,
    check('id','No es un id de mongo').isMongoId(),
    check('nombre','Nombre obligatorio').notEmpty(),
    check('categoria','Categoria debe ser un mongoid').isMongoId(),
    validarCampos
],actualizarProducto)
//eliminar
router.delete('/:id',[
    validarJWT,
    validarRol,
    check('id','No es un id de mongo').isMongoId(),
    validarCampos
],deleteProducto)
module.exports = router