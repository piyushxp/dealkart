const Product = require("../models/Product");

const mongoose = require("mongoose");

const formidable = require("formidable");
const fs = require("fs");

// @route   POST api/product/
// @desc    Create a Product
// @access  Private Admin only
exports.createProduct = async (req, res) => {
	let form = new formidable.IncomingForm();

	form.keepExtensions = true;

	form.parse(req, async (err, fields, files) => {
		if (err) {
			return res.status(400).json({
				error: "Image could not be Uploaded",
			});
		}

		if (!files.photo) {
			return res.status(400).json({
				error: "Image is Required",
			});
		}

		if (
			files.photo.type !== "image/jpeg" &&
			files.photo.type !== "image/jpg" &&
			files.photo.type !== "image/png"
		) {
			return res.status(400).json({
				error: "Image type Not Allowed",
			});
		}

		//Check all the Fields
		const { name, description, price, category, quantity, shipping } = fields;

		if (
			!name ||
			!description ||
			!price ||
			!category ||
			!quantity ||
			!shipping
		) {
			return res.status(400).json({
				error: "All fields are requireed",
			});
		}

		let product = new Product(fields);
		//1mb = 1000000
		if (files.photo.size > 1000000) {
			return res.status(400).json({
				error: "Image should be less than 1MB in Size",
			});
		}

		product.photo.data = fs.readFileSync(files.photo.path);
		product.photo.contentType = files.photo.type;

		try {
			await product.save();
			res.json("Product Created Successfully!");
		} catch (error) {
			console.log(error);
			res.status(500).send("Server Error");
		}
	});
};

// @route   GET api/product/ProductId
// @desc    GEt Product Deatils
// @access  Public

exports.getProductDetails = async (req, res) => {
	const { productId } = req.params;
	console.log("piiyusheeeee")

	if (!mongoose.Types.ObjectId.isValid(productId)) {
		return res.status(403).json({
			error: "Product not Found,Please check the Product Id",
		});
	}

	try {
		let product = await Product.findById({ _id: productId }).populate(
			"category"
		);
		console.log(product);
		if (!product) return res.status(403).json({ error: "Product Not Found" });
		// return res.status(200).json(product);

		//avoid sending product image
		product.photo = undefined

		//send the deatils of product
		return res.status(200).json(product)

	} catch (error) {
		console.log(error);
		res.json("server Error");
	}


};


// @route   GET api/product/photo/ProductId
// @desc    GEt Product Photo
// @access  Public

exports.getProductPhoto = async (req, res, next) => {
	const { productId } = req.params;
console.log("piiyusheeeee")


	//check for mongoid valid
	if (!mongoose.Types.ObjectId.isValid(productId)) {
		return res.status(403).json({
			error: "Product not Found,Please check the Product Id",
		});
	}

	try {
		let product = await Product.findById({ _id: productId })
		console.log(product)
		//check
		if (!product) return res.status(403).json({ error: "Product Not Found" });
		if(!product.photo.data) return res.status(403).json({ error: "Product Image Not Available" });
		// return res.status(200).json(product);

		if(product.photo.data){
			res.set('Content-Type',product.photo.contentType)
			return res.send(product.photo.data)
		}

	} catch (error) {
		console.log(error);
		res.json("server Error");
	}

	
};


// @route   GET api/product/list
// @desc    GEt LIST OF PRODUCTS WITH FILTER
/**
 * @options  (order __ asc or desc)
 *           (sortBy __ product name like name ,limit number of return products)
 *  */   
// @access  Public

exports.getProductListAndFilter = async(req,res)=>{
	let order = req.query.order ? req.query.order : 'asc'
	let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
	let limit = req.query.limit ? parseInt(req.query.limit) : 6;
console.log("piiyusheeeee")

	try {
		let products = await Product.find({})
		.select('-photo').populate('category').sort([
			[sortBy,order]
		]).limit(limit).exec()

		res.json(products)
	} catch (error) {
		console.log(error)
		res.status(500).send("Please check the Query,Something went Wrong there I guess")
	}


	
}