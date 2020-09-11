const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')



const {createProduct} = require('../controllers/product.controller')

router.post('/',auth,adminAuth,createProduct)


module.exports = router
