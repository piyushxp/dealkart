const jwt = require("jsonwebtoken"); // jwt token
const bcrypt = require("bcryptjs"); // encrypt password
const User = require("../models/User");


// Check validation for requests
const {validationResult } = require("express-validator");
const gravatar = require("gravatar"); // get user image by email


// @route   POST api/user/register
// @desc    Register user
// @access  Public
exports.register = async (req, res) => {
	console.log(req.body);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		});
	}
	// get name and email and password from request
	const { name, email, password } = req.body;

	try {
		// Check if user already exist
		let user = await User.findOne({
			email,
		});

		// If user exist
		if (user) {
			return res.status(400).json({
				errors: [
					{
						msg: "User already exists bro",
					},
				],
			});
		}

		// If not exists
		// get image from gravatar
		const avatar = gravatar.url(email, {
			s: "200", // Size
			r: "pg", // Rate,
			d: "mm", //default
		});

		// create user object
		user = new User({
			name,
			email,
			avatar,
			password,
		});

		// encrypt password
		const salt = await bcrypt.genSalt(10); // generate salt contains 10
		// save password
		user.password = await bcrypt.hash(password, salt); // hash the password with the salt
		//save user in database
		await user.save();

		// payload to generate token
		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{
				expiresIn: 360000, // for development ==> 3600
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


// @route   POST api/user
// @desc    User Information
// @access  Private
exports.profile = async (req, res) => {
	try {
		// get user information by id
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (error) {
		console.log(err.message);
		res.status(500).send("Server Error");
	}
}

// @route   POST api/user/login
// @desc    Login user
// @access  Public
exports.login = async (req, res) => {
	// If error
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		});
	}

	//if no errors from validation
	// get email and password from request body
	const { email, password } = req.body;

	try {
		// Check for user
		let user = await User.findOne({
			email,
		});

		// If User doesn't Exist return with error
		if (!user) {
			return res.status(400).json({
				errors: [
					{
						msg: "Invalid credentials",
					},
				],
			});
		}

		// If User found,compare Password her
		const isMatch = await bcrypt.compare(password, user.password);

		// If passwords don't match,Return
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
					msg: "You have succesfully Logged in "
				});
			}
		);
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Server error");
	}
}







// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

// exports.signup = (req, res) => {
// 	User.findOne({ email: req.body.email }).exec((err, user) => {
// 		if (user) {
// 			return res.status(400).json({
// 				message: "User already Registered",
// 			});
// 		}

// 		const { firstName, lastName, email, password } = req.body;

// 		const _user = new User({
// 			firstName,
// 			lastName,
// 			email,
// 			password,
// 			username: Math.random().toString(),
// 		});

// 		_user.save((error, data) => {
// 			if (error) {
// 				return res.status(400).json({
// 					message: "Something went Wrong",
// 				});
// 			}
// 			if (data) {
// 				return res.status(201).json({
// 					message: "User Created Successfully",
// 				});
// 			}
// 		});
// 	});
// };

// exports.signin = (req, res) => {
// 	User.findOne({ email: req.body.email }).exec((err, user) => {
// 		if (err) return res.status(400).json({ err });
// 		if (user) {
// 			if (user.authenticate(req.body.password)) {
// 				//token creation

// 				const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
// 					expiresIn: "12h",
// 				});
// 				const { _id, firstName, lastName, email, role, fullName } = user;

// 				res.status(200).json({
// 					token,
// 					user: {
// 						_id,
// 						firstName,
// 						lastName,
// 						email,
// 						role,
// 						fullName,
// 					},
// 				});
// 			} else {
// 				return res.status(400).json({
// 					message: "Invalid Credentials",
// 				});
// 			}
// 		} else {
// 			return res.status(400).json({ message: "Something went Wrong" });
// 		}
// 	});
// };

// exports.requireSignin = (req, res, next) => {
// 	const token = req.headers.authorization.split(" ")[1];
// 	const user = jwt.verify(token, process.env.JWT_SECRET);
// 	req.user = user;
// 	// console.log(token)

// 	next();
// };
