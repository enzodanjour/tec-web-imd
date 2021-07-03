const express = require('express')
const router = express.Router()
const productMid = require('../middleware/validate_products_middleware')
const { Produto } = require('../db/models')


router.post('/', productMid)
router.put('/', productMid)

router.get('/', async (req,resp)=>{
    const products = await Produto.findAll()
    resp.json({
        products:products 
    })
})

router.get('/:id',async  (req,resp)=>{
    const product = await Produto.findByPk(req.params.id)
    resp.json({products:product})
})



router.post('/', async (req,resp)=>{
    const product = await Produto.create(req.body)
    resp.json({
        msg:"Produto"+ product.nome +"adicionado com sucesso!"
    })
})

router.put('/', async (req,resp)=>{
    const id = req.query.id
    const product = await Produto.findByPk(id)
    if(product){
        product.nome = req.body.nome
        product.descrição = req.body.descrição
        product.valor = req.body.descrição
        // product.tags = req.body.tags
        await product.save()
        resp.json({msg:"Produto atualizado"})
    }else{
        resp.status(400).json({
            msg:"Produto não encontrado"
        })
    }
})

router.delete('/', async (req,resp)=>{
    const id = req.query.id
    const product = await Produto.findByPk(id)
    if(product){
        await product.destroy()
        resp.json({msg: "Produto deletado"})
    }else{
        resp.status(400).json({
            msg: "Produto não encontrado"
        })
    }
})



module.exports = router