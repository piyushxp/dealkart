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

exports.getProductDetails = async (req, res, next) => {
	const { productId } = req.params;

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

		//passing it to a middleware

		req.product = product;
	} catch (error) {
		console.log(error);
		res.json("server Error");
	}

	next();
};
