const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')



const {createProduct,getProductDetails} = require('../controllers/product.controller')

router.post('/',auth,adminAuth,createProduct)
router.get('/:productId',getProductDetails,(req,res)=>{
    req.product.photo = undefined

    return res.json(req.product)
})

router.get('/:productId',getProductDetails,(req,res)=>{
    req.product.photo = undefined

    return res.json(req.product)
})


module.exports = router
