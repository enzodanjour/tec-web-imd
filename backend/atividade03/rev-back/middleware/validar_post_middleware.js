const Ajv = require('ajv')
const ajv = new Ajv()
const postSchema = require('../schema/post_schema')

function validarPost(req,resp,next){
    const post = req.body
    const validate = ajv.compile(postSchema)
    const valid = validate(post)
    if (valid){
        next()
    }else{
        resp.status(400).json({msg: "Dados inválidos", erros: validate.errors})
    }
}

module.exports = validarPost