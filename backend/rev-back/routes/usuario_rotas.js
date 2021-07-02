const express = require('express')
const { v4: uuidv4} = require('uuid');
const router = express.Router()
const usuarioMid = require('../middleware/validar_usuario_middleware')
const { Usuario } = require("../models")
const usuarios = {}

router.post('/', usuarioMid)
router.put('/', usuarioMid)

router.get('/', async (req,resp)=>{
    const usuarios = await Usuario.findAll()
    resp.json({
        usuarios: usuarios
    })
})

router.get('/:id', async (req,resp)=>{
    const usuario = await Usuario.findByPk(req.params.id)
    resp.json({usuario: usuario})
})

router.post('/',async (req, resp)=>{
    const post = await Usuario.create(req.body)
    resp.json({msg: "Usuário adicionado com sucesso!"})
   
})

router.put('/', async (req,resp)=>{
    
    const id = req.query.id
    const usuario = await Usuario.findByPk(id)
    if (usuario){
        usuario.email = req.body.email
        usuario.senha = req.body.senha
        await usuario.save()
        resp.json({msg:"Usuário atualizado"})
    }else{
        resp.status(400).json({
            msg:"Usuário não encontrado"
        })
    }
})

router.delete('/',(req,resp)=>{
    const id = req.query.id
    const usuario = await Usuario.findByPk(id)
    if (usuario){
        await usuario.destroy()
        resp.json({msg: "Usuário deletado com sucesso!"})
    }else{
         resp.status(400).json({msg:"Usuário não encontrado"})
    }
})



// exporta as rotas para
module.exports = router