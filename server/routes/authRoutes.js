const express = require('express')

const {signup,signin,requireSignin} = require('../controllers/authController.js')

const router = express.Router()

//AUTH
router.route('/signup').post(signup)
router.route('/signin').post(signin)

//PROTECTED
router.route('/profile').post(requireSignin,(req,res)=>{
    console.log("THis is Profile")
    res.send("This si Profile section")
})



module.exports = router

