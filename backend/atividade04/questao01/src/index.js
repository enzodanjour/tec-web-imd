const express = require('express')
const productRoutes = require('./routes/products_routes')

const app = express()
app.use(express.json())

app.use('/produtos',productRoutes)

app.get('/',(req,resp)=>{
    resp.json({
        msg: "Hello world from express"
    })
})

app.listen(8080,()=>{
    console.log('Servidor pronto')
})

// exposição para a camada de imagens de forma distribuida
app.use('/static',express.static('public'))