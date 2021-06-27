const express = require('express')
const { v4: uuidv4} = require('uuid');
const router = express.Router()
const usuarioMid = require('../middleware/validar_usuario_middleware')

const usuarios = {}

router.post('/', usuarioMid)
router.put('/', usuarioMid)

router.get('/:id',(req,resp)=>{
    resp.json({usuarios: usuarios[req.params.id]})
})

router.delete('/',(req,resp)=>{
    const id = req.query.id
    if (id && usuarios[id]){
        delete usuarios[id]
        resp.json({msg: "Usuário deletado com sucesso!"})
    }else{
         resp.status(400).json({msg:"Usuário não encontrado"})
    }
})

router.put('/',(req,resp)=>{
    const id = req.query.id
    if (id && usuarios[id]){
        const usuario = req.body
        usuario.id = id
        usuarios[id] = req.body
        resp.json({msg:"Usuário atualizado"})
    }else{
        resp.status(400).json({
            msg:"Usuário não encontrado"
        })
    }
})

router.post('/',(req, resp)=>{
    const usuario = req.body
    const idUsuario = uuidv4()
    usuario.id = idUsuario
    usuarios[idUsuario] = usuario

    resp.json({msg: "Usuário adicionado com sucesso!"})
   
})


router.get('/',(req,resp)=>{
    resp.json({
        usuarios:Object.values(usuarios)
    })
})
// exporta as rotas para
module.exports = router