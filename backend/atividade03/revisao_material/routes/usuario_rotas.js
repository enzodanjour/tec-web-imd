const express = require('express')
const { v4: uuidv4} = require('uuid');
const router = express.Router()

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
        resp.status(400).json({msg:"Usuário não encontrado"})
    }
})

router.put('/',(req,resp)=>{
    const id = req.query.id
    if (id && usuarios[id]){
        const aluno = req.body
        aluno.id = id
        usuarios[id] = req.body
        resp.json({msg:"Usuário atualizado"})
    }else{
        resp.status(400).json({
            msg:"Usuário não encontrado"
        })
    }
})

router.post('/',(req,resp) =>{
    const aluno = req.body
    const idAluno = uuidv4()//identificador unico de aluno
    aluno.id = idAluno
    usuarios[idAluno] = aluno
    resp.json({
        msg:"Usuário adicionado com sucesso!"
    })
})

router.get('/',(req,resp)=>{
    resp.json({
        usuarios:Object.values(usuarios)
    })
})
// exporta as rotas para
module.exports = router