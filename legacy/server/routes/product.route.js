const express = require('express')
const router = express.Router()

//import middleware here
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')

//import controllers here
const {createProduct,getProductDetails,getProductPhoto,getProductListAndFilter} = require('../controllers/product.controller')


router.get('/list',getProductListAndFilter)
router.post('/',auth,adminAuth,createProduct)
router.get('/:productId',getProductDetails)
router.get('/photo/:productId',getProductPhoto)




module.exports = router
