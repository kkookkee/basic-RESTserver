const {Router} = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validacionCampos')
const { validarColecciones} = require('../helpers/dbValidator')
const { response, request } = require("express");
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads')







const router = Router()

router.post('/',cargarArchivo)

router.put('/:coleccion/:id',[
    check('id','No es id de mongo').isMongoId(),
    check('coleccion').custom(c=>validarColecciones(c,['usuarios','productos'])),
    validarCampos
],actualizarImagenCloudinary)

router.get('/:coleccion/:id',[
    check('id','No es id de mongo').isMongoId(),
    check('coleccion').custom(c=>validarColecciones(c,['usuarios','productos'])),
    validarCampos
],mostrarImagen)




module.exports = router;