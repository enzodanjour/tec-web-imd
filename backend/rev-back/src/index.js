const express = require('express')
const rotaUsuario = require('./routes/usuario_rotas')
const rotaPost = require('./routes/post_rotas')

const app = express()
app.use(express.json())

app.use('/usuarios',rotaUsuario)
app.use('/posts', rotaPost)


app.get('/',(req,resp)=>{
    resp.json({
        msg:"Hello from express"
    })
})




app.listen(8080,()=>{
    console.log('Servidor pronto na porta 8080')
})
