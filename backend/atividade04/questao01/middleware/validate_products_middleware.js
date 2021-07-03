const Ajv = require('ajv')
const ajv = new Ajv()
const productSchema = require('../schema/product_schema')

function validateProduct(req,resp,next){
    const product = req.body
    const validate = ajv.compile(productSchema)
    const valid = validate(product)
    if(valid){
        next()
    }else{
        resp.status(400).json({
            msg: "Dados inválidos", 
            erros: validate.errors
        })
    }
}

module.exports = validateProduct