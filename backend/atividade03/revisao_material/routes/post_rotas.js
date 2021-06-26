const express = require('express')
const { v4: uuidv4} = require('uuid');
const router = express.Router()

const posts = {}

router.get('/:id',(req,resp)=>{
    resp.json({posts: posts[req.params.id]})
})

router.delete('/',(req,resp)=>{
    const id = req.query.id
    if (id && posts[id]){
        delete posts[id]
        resp.json({msg: "post deletado com sucesso!"})
    }else{
        resp.status(400).json({msg:"post não foi encontrado"})
    }
})

router.put('/',(req,resp)=>{
    const id = req.query.id
    if (id && posts[id]){
        const posts = req.body
        posts.id = id
        posts[id] = req.body
        resp.json({msg:"post atualizado"})
    }else{
        resp.status(400).json({
            msg:"post não encontrado"
        })
    }
})

router.post('/',(req,resp) =>{
    const post = req.body
    const idpost = uuidv4()//identificador unico de post
    post.id = idpost
    posts[idpost] = post
    resp.json({
        msg:"post adicionado com sucesso!"
    })
})

router.get('/',(req,resp)=>{
    resp.json({
        posts:Object.values(posts)
    })
})
// exporta as rotas para
module.exports = router