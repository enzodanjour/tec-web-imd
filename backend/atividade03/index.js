const express = require('express')
const { v4: uuidv4} = require('uuid');
const app = express()
app.use(express.json())


const alunos = {}

app.get('/',(req,resp)=>{
    resp.json({
        msg:"Hello from express"
    })
})

app.get('/alunos/:id',(req,resp)=>{
    resp.json({aluno: alunos[req.params.id]})
})

app.delete('/alunos',(req,resp)=>{
    const id = req.query.id
    if (id && alunos[id]){
        delete alunos[id]
        resp.json({msg: "Aluno deletado com sucesso!"})
    }else{
        resp.status(400).json({msg:"Aluno não foi encontrado"})
    }
})

app.put('/alunos',(req,resp)=>{
    const id = req.query.id
    if (id && alunos[id]){
        const aluno = req.body
        aluno.id = id
        alunos[id] = req.body
        resp.json({msg:"Aluno atualizado"})
    }else{
        resp.status(400).json({
            msg:"Aluno não encontrado"
        })
    }
})

app.post('/alunos',(req,resp) =>{
    const aluno = req.body
    const idAluno = uuidv4()//identificador unico de aluno
    aluno.id = idAluno
    alunos[idAluno] = aluno
    resp.json({
        msg:"Aluno adicionado com sucesso!"
    })
})

app.get('/alunos',(req,resp)=>{
    resp.json({
        alunos:Object.values(alunos)
    })
})

app.listen(8080,()=>{
    console.log('Servidor pronto na porta 8080')
})
