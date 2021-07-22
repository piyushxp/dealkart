const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please Enter a Product Name"],
		trim: true,
		maxLength: [100, "The max limit for name is 100 characters"],
	},
	price: {
		type: Number,
		required: [true, "Plese enter Price"],
		default: 0.0,
	},
	description: {
		type: String,
		required: [true, "Please Enter a Product Name"],
	},

	ratings: {
		type: Number,
		default: 0,
	},

	images: [
		{
			public_id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
	],

	category: {
		type: String,
		required: [true, "Please select Category for this Product"],
		enum: {
			values: [
				"Electronics",
				"Cameras",
				"Laptops",
				"Accessories",
				"Headphones",
				"Food",
				"Books",
				"Clothes",
				"Shoes",
				"Beauty/Health",
				"Sports",
				"Outdoors",
				"Home",
				"Kitchen",
			],
			message: "Please Select Correct Category for Product",
		},
	},

	seller: {
		type: String,
		required: [true, "Please enter product seller"],
	},
	stock: {
		type: Number,
		required: [true, "Please enter product stock"],
		maxLength: [5, "Product name cant exceed 5 characters"],
		default: 0,
	},

	numOfReviews: {
		type: Number,
		default: 0,
	},

	reviews: [
		{
			name: {
				type: String,
				required: true,
			},
			rating: {
				type: Number,
				required: true,
			},
			comment: {
				type: String,
				required: true,
			},
		},
	],

	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("Products", productSchema);
