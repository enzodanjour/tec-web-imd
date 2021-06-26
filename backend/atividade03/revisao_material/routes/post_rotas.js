const express = require('express')
const { v4: uuidv4} = require('uuid');
const router = express.Router()

const post = {}

router.get('/:id',(req,resp)=>{
    resp.json({post: post[req.params.id]})
})

router.delete('/',(req,resp)=>{
    const id = req.query.id
    if (id && post[id]){
        delete post[id]
        resp.json({msg: "usuario deletado com sucesso!"})
    }else{
        resp.status(400).json({msg:"usuario não foi encontrado"})
    }
})

router.put('/',(req,resp)=>{
    const id = req.query.id
    if (id && post[id]){
        const post = req.body
        post.id = id
        post[id] = req.body
        resp.json({msg:"usuario atualizado"})
    }else{
        resp.status(400).json({
            msg:"usuario não encontrado"
        })
    }
})

router.post('/',(req,resp) =>{
    const post = req.body
    const idpost = uuidv4()//identificador unico de post
    post.id = idpost
    post[idpost] = post
    resp.json({
        msg:"usuario adicionado com sucesso!"
    })
})

router.get('/',(req,resp)=>{
    resp.json({
        post:Object.values(post)
    })
})
// exporta as rotas para
module.exports = router