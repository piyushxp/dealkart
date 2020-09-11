const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken"); // jwt token
const bcrypt = require("bcryptjs"); // encrypt password
const User = require("../models/User");


// Check validation for requests
const { check, validationResult } = require("express-validator");

// const auth = require("../middleware/auth");

//import validator
const { userRegisterValidator } = require("../utils/auth.validator");
const { userLoginValidator } = require("../utils/auth.validator");


//import controller
const {register} = require('../controllers/auth.controller')
// @route   POST api/user
// @desc    User Information
// @access  Private
router.get("/", async (req, res) => {
	try {
		// get user information by id
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (error) {
		console.log(err.message);
		res.status(500).send("Server Error");
	}
});

// @route   POST api/user/register
// @desc    Register user
// @access  Public
router.post("/register", userRegisterValidator, 
register);

// @route   POST api/user/login
// @desc    Login user
// @access  Public
router.post(
	"/login",
	[
		// Validation for email and password
		check("email", "please include a valid email").isEmail(),
		check("password", "password is required").exists(),
	],
	async (req, res) => {
		// If error
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
			});
		}

		// if everything is good
		// get email and password from request body
		const { email, password } = req.body;

		try {
			// find user
			let user = await User.findOne({
				email,
			});

			// If user not found in database
			if (!user) {
				return res.status(400).json({
					errors: [
						{
							msg: "Invalid credentials",
						},
					],
				});
			}

			// Know user founded by email let's compare passwords
			const isMatch = await bcrypt.compare(password, user.password);

			// passwords don't match
			if (!isMatch) {
				return res.status(400).json({
					errors: [
						{
							msg: "Invalid credentials",
						},
					],
				});
			}

			// payload for jwt
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				process.env.JWT_SECRET,
				{
					expiresIn: 360000,
				},
				(err, token) => {
					if (err) throw err;
					res.json({
						token,
					});
				}
			);
		} catch (error) {
			console.log(err.message);
			res.status(500).send("Server error");
		}
	}
);
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
