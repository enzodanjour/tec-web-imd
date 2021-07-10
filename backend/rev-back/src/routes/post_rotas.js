const express = require('express')
const { v4: uuidv4 } = require('uuid');
const router = express.Router()
const postMid = require('../middleware/validar_post_middleware')
const { Post, Usuario } = require('../db/models')
const path = require('path')
var  multer   =  require ( 'multer' ) 

var storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, 'public/uploads')
    },
    filename: function (req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))  //padroniza o arquivo
    }
})

const fileFilter = (req,file,cb)=>{
    const extensoes = /jpeg|jpg|png/i //permite quaisquer tipos de arquivo
    if(extensoes.test(path.extname(file.originalname))){
        cb(null, true)
    }else{
        return cb('Arquivo não suportado. Apenas jpeg ou jpg são suportados')
    }
}
var  upload  =  multer ( {storage : storage, fileFilter:fileFilter})

router.post('/',upload.single('foto'))
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
    const data = req.body
    if(req.file){
        data.foto =`static/uploads/${req.file.filename}`
    }
    const post = await Post.create(data)
    resp.json({
        msg: "post adicionado com sucesso!"
    })
})

router.post('/:id/upload',upload.single('foto'), async (req,resp) =>{
    const id = req.params.id
    const post = await Post.findByPk(id)

    if (post) {
        post.foto =`static/uploads/${req.file.filename}`
        await post.save()
        resp.json({ msg: "Upload realizado com sucesso!" })
    } else {
        resp.status(400).json({
            msg: "post não encontrado"
        })
    }
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
        if(result.Usuario.createdAt) delete result.Usuario.createdAt
        if(result.Usuario.updatedAt) delete result.Usuario.updatedAt
    }

    return result
}


// exporta as rotas para o main
module.exports = router