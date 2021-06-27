const express = require('express')
// const product_routes = require('./routes/products_routes')

const app = express()
app.use(express.json)

// app.use('/produtos',product_routes)

app.get('/',(req,resp)=>{
    resp.json({
        msg: 'Hello world'
    })
})

app.listen(8080,()=>{
    console.log('Servidor pronto')
})