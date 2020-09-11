const express = require("express");
const router = express.Router();


//import middleware
// const auth = require("../middleware/auth");

//import validator
const {
	userRegisterValidator,
	userLoginValidator,
} = require("../utils/auth.validator");

//import controller
const { profile, register, login } = require("../controllers/auth.controller");

router.get("/", profile);
router.post("/register", userRegisterValidator, register);
router.post("/login", userLoginValidator, login);



module.exports = router;

// const express = require('express')

// const {signup,signin,requireSignin} = require('../controllers/authController.js')

// const router = express.Router()

// //AUTH
// router.route('/signup').post(signup)
// router.route('/signin').post(signin)

// //PROTECTED
// router.route('/profile').post(requireSignin,(req,res)=>{
//     console.log("THis is Profile")
//     res.send("This si Profile section")
// })

// module.exports = router
