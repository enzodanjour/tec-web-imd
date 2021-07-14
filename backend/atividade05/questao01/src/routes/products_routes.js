const express = require('express')
const router = express.Router()
const productMid = require('../middleware/validate_products_middleware')
const { Produto, Tag } = require('../db/models')
const path = require('path')
var multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
       cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) 
  }
})

const fileFilter= (req,file,cb) =>{
  const extensoes = /jpeg|jpg|png/i
  if(extensoes.test(path.extname(file.originalname))){
    cb(null,true);
  }else{
    return cb('Arquivo não suportado, apenas jpg,png,jpeg')
  }
}

var upload = multer({storage : storage, fileFilter:fileFilter})

router.post('/',upload.single('foto'))
router.post('/', productMid)
router.put('/', productMid)

router.get('/', async (req,resp)=>{
    const products = await Produto.findAll({
        include: [
            {
              model: Tag,
            },
          ],
          raw: false,
          nest: true,
    })
    resp.json({
        products:products 
    })
})

router.get('/:id',async  (req,resp)=>{
    const product = await Produto.findByPk(req.params.id,{
        include: [
            {
              model: Tag,
            },
          ],
          raw: false,
          nest: true,
    })
    resp.json({products:product})
})



router.post('/', async (req,resp)=>{
    const { tags, ...produto } = req.body;
  if(req.file){
    data.foto =`static/uploads/${req.file.filename}`
  }
  if (tags){
    const savedProduct = await Produto.create(produto)
    console.log(savedProduct)
    tags.forEach( async (tag) => {
      console.log(savedProduct.dataValues.id)
      await Tag.create({nome: tag, produtoId: savedProduct.dataValues.id})
    })
  }else{
    await Produto.create(req.body)
  }
    resp.json({
        msg:"Produt adicionado com sucesso!"
    })
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const produto = await Produto.findByPk(id)
  
    if (produto) {
      produto.nome = req.body.nome
      produto.descricao = req.body.descricao
      produto.preco = req.body.preco
      await produto.save()
      res.json({ msg: "Produto atualizado com sucesso!" })
    } else {
      res.status(400).json({ msg: "Produto não encontrado!" })
    }
})

router.delete('/:id', async (req,resp)=>{
    const id = req.params.id
    const produto = await Produto.findByPk(id)
    if (produto){
        await produto.destroy()
        res.json({msg: "Produto deletado com sucesso!"})
    }else{
        res.status(400).json({msg: "Produto não encontrado!"})
    }
})



module.exports = router