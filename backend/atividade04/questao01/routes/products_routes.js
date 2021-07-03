const express = require('express')
const { v4: uuidv4} = require('uuid')
const router = express.Router()
const productMid = require('../middleware/validate_products_middleware')
const { product } = require("../models")

products = {}

router.post('/', productMid)
router.put('/', productMid)

router.get('/', (req,resp)=>{
    resp.json({
        products:Object.values(products) 
    })
})

router.get('/:id', (req,resp)=>{
    resp.json({products: products[req.params.id]})
})



router.post('/', (req,resp)=>{
    const product = req.body
    const idProduct = uuidv4()
    product.id = idProduct
    products[idProduct] = product
    resp.json({
        msg:"Produto adicionado com sucesso!"
    })
})

router.put('/', (req,resp)=>{
    const id = req.query.id
    if(id && products[id]){
        const product = req.body
        product.id = id
        products[id] = req.body
        resp.json({msg:"Produto atualizado"})
    }else{
        resp.status(400).json({
            msg:"Produto não encontrado"
        })
    }
})

router.delete('/', (req,resp)=>{
    const id = req.query.id
    if(id && products[id]){
        delete products[id]
        resp.json({msg: "Produto deletado"})
    }else{
        resp.status(400).json({
            msg: "Produto não encontrado"
        })
    }
})



module.exports = router