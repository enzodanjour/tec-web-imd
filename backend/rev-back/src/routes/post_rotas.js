const express = require('express')
const { v4: uuidv4 } = require('uuid');
const router = express.Router()
const postMid = require('../middleware/validar_post_middleware')
const { Post, Usuario } = require('../db/models')

router.post('/', postMid)
router.put('/', postMid)

//Operações assíncronas
router.get('/', async (req, resp) => {
    const posts = await Post.findAll()
    resp.json({
        posts: posts
    })
})

router.get('/:id', async (req, resp) => {
    const post = await Post.findByPk(req.params.id, { include: [{ model: Usuario }], raw: true , nest: true})
    const postProcessado = prepararResultado(post)
    resp.json({ posts: postProcessado })
})

router.post('/', async (req, resp) => {
    const post = await Post.create(req.body)
    resp.json({
        msg: "post adicionado com sucesso!"
    })
})

router.delete('/', async (req, resp) => {
    const id = req.query.id
    const post = await Post.findByPk(id)
    if (post) {
        //deletar
        await post.destroy()
        resp.json({ msg: "post deletado com sucesso!" })
    } else {
        resp.status(400).json({ msg: "post não foi encontrado" })
    }
})

router.put('/', async (req, resp) => {
    const id = req.query.id
    const post = await Post.findByPk(id)

    if (post) {
        post.titulo = req.body.titulo
        post.texto = req.body.texto
        await post.save()
        resp.json({ msg: "post atualizado com sucesso!" })
    } else {
        resp.status(400).json({
            msg: "post não encontrado"
        })
    }
})

function prepararResultado(post){
    const result = Object.assign({},post)

    if(result.createdAt) delete result.createdAt
    if(result.updatedAt) delete result.updatedAt
    if(result.userId) delete result.userId
    if(result.Usuario){
        if(result.Usuario.senha) delete result.Usuario.senha
    }

    return result
}


// exporta as rotas para o main
module.exports = router