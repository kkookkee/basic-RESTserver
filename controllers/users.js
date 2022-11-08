const {response} = require('express')

const usuariosGet = (req, res = response) => {
    const {q,nombre} = req.query
    res.status(200).json({
        msg:'get api',
        q,
        nombre
    })
}
const usuariosPut = (req, res = response) => {
    const {id} = req.params.id;
    res.status(200).json({
        msg:'put api ',
        id
    })
}
const usuariosPost = (req, res = response) => {
    const {nombre,edad} = req.body
    res.status(200).json({
        msg:'post api',
        nombre,
        edad
    })
}
const usuariosDelete = (req, res = response) => {
    res.status(403).json({
        msg:'delete api '
    })
}
const usuariosPatch = (req, res = response) => {
    res.status(403).json({
        msg:'patch api '
    })
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}