const express = require('express')
const { v4: uuidv4} = require('uuid');
const router = express.Router()
const usuarioSchema = require('../schemas/usuario_schema')
const Ajv = require('ajv')
const ajv = new Ajv()

const addFormats = require("ajv-formats")
addFormats(ajv)

const usuarios = {}

router.get('/:id',(req,resp)=>{
    resp.json({usuarios: usuarios[req.params.id]})
})

router.delete('/',(req,resp)=>{
    const id = req.query.id
    if (id && usuarios[id]){
        delete usuarios[id]
        resp.json({msg: "Usuário deletado com sucesso!"})
    }else{
        // resp.status(400).json({msg:"Usuário não encontrado"})
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

router.post('/', (req, res) => {
    const usuario = req.body

        const validate = ajv.compile(usuarioSchema)
        const valid = validate(usuario)

        if (valid){
            const idUsuario = uuidv4()
            usuario.id = idUsuario
            usuarios[idUsuario] = usuario

            res.json({msg: "Usuário adicionado com sucesso!"})
        }else{
           res.status(400).json({msg: "Dados inválidos", errors: validate.errors})
        }

})

router.get('/',(req,resp)=>{
    resp.json({
        usuarios:Object.values(usuarios)
    })
})
// exporta as rotas para
module.exports = router