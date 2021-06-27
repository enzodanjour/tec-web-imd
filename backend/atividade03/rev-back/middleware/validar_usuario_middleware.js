const Ajv = require('ajv')
const ajv = new Ajv()
const addFormats = require("ajv-formats")
addFormats(ajv)
const usuarioSchema = require('../schema/usuario_schema')


function validarUsuario(req,resp,next){
    const usuario = req.body
    const validate = ajv.compile(usuarioSchema)
    const valid = validate(usuario)
    if(valid){
        next()
    } else {
        resp.status(400).json({msg: "Dados inválidos", errors: validate.errors})
    }

}
module.exports = validarUsuario