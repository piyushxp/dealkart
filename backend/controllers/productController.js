const Product = require("../models/product");

//Create new Product => /api/v1/product/new

exports.newProduct = async (req, res, next) => {
	console.log(req.body);
	const product = await Product.create(req.body);

	res.status(201).json({
		success: true,
		product,
	});
};

exports.getProducts = (req, res, next) => {
	res.status(200).json({});
};
