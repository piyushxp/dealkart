const Category = require("../models/Category");
const { validationResult } = require("express-validator");
const mongoose = require('mongoose')
// @route   POST api/category
// @desc    Create Category
// @access  Private Admin

exports.addCategory = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			error: errors.array()[0].msg,
		});
	}
	const { name } = req.body;

	try {
		//see if the category name exists
		let category = await Category.findOne({ name });

		//if the category name exists
		if (category) {
			return res.status(403).json({
				error: "Category Already Exists",
			});
		}

		//if doesnt exist ,Create A Category-Name
		const newCategory = new Category({ name });

		//save that in DB
		category = await newCategory.save();
		res.json({ category, msg: "Category Added" });
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
	res.send("OKAY,Admin Authorization Accepted");
};


// @route   POST api/category/all
// @desc    Get all  Category
// @access  Public 

exports.getAllCategory = async(req, res) => {
	try {
		const data = await Category.find({})
		res.json(data)
	} catch (error) {
		console.log(error)
		res.status(500).send("server error")
		
	}
};




// @route   POST api/category/:categoryId
// @desc    Get single  Category
// @access  Public 

exports.getCategoryById = async(req, res) => {
	try {
		const {categoryId} = req.params
    
		if(!mongoose.Types.ObjectId.isValid(categoryId)){
			return res.status(403).json({
				error:"category not found"
			})
		}
		const data = await Category.findById({_id:categoryId})
		res.json(data)
	} catch (error) {
		console.log(error)
		res.status(500).send("server error")
		
	}
};

// @route   PUT api/category/:categoryId
// @desc    Update single  Category
// @access  Private 

exports.updateCategoryById = async(req, res) => {
	try {
		const {categoryId} = req.params
		const {name} = req.body
    
		if(!mongoose.Types.ObjectId.isValid(categoryId)){
			return res.status(403).json({
				error:"category not found"
			})
		}
		const data = await Category.findOneAndUpdate({_id:categoryId}, {name}, {
			new: true,
		})
		res.json(data)
	} catch (error) {
		console.log(error)
		res.status(500).send("server error")
		
	}
};


// @route   DELETE api/category/:categoryId
// @desc    DELETE single  Category
// @access  Private 
exports.deleteCategoryById = async(req, res) => {
	try {
		const {categoryId} = req.params

    
		if(!mongoose.Types.ObjectId.isValid(categoryId)){
			return res.status(403).json({
				error:"category not found"
			})
		}
		const data = await Category.findOneAndDelete({_id:categoryId})
		res.json({data:`${data.name} has been Deleted Successfully`})
	} catch (error) {
		console.log(error)
		res.status(500).send("server error")
		
	}
};



// exports.requireSignin = (req, res, next) => {
// 	const token = req.headers.authorization.split(" ")[1];
// 	const user = jwt.verify(token, process.env.JWT_SECRET);
// 	req.user = user;
// 	// console.log(token)

// 	next();
// };

// exports.signup = (req, res) => {
// 	User.findOne({ email: req.body.email }).exec((err, user) => {
// 		if (user) {
// 			return res.status(400).json({
// 				message: "Admin already Registered",
// 			});
// 		}
// 		// console.log(req.body);
// 		const { firstName, lastName, email, password } = req.body;

// 		const _user = new User({
// 			firstName,
// 			lastName,
// 			email,
// 			password,
// 			username: Math.random().toString(),
// 			role: "admin",
//         });
//         // console.log(_user)

// 		_user.save((error, data) => {
// 			if (error) {
// 				return res.status(400).json({
// 					message: "Something went Wrong",
// 				});
// 			}
// 			if (data) {
// 				return res.status(201).json({
// 					message: "Admin Created Successfully",
// 				});
// 			}
// 		});
// 	});
// };

// exports.signin = (req, res) => {
// 	User.findOne({ email: req.body.email }).exec((err, user) => {
// 		if (err) return res.status(400).json({ err });
// 		if (user) {
// 			if (user.authenticate(req.body.password) && user.role === "admin") {
// 				//token creation

// 				const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
// 					expiresIn: "12h",
// 				});
// 				const { _id, firstName, lastName, email, role, fullName } = user;
// 				//token sending
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
