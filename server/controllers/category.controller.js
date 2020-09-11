const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
	User.findOne({ email: req.body.email }).exec((err, user) => {
		if (user) {
			return res.status(400).json({
				message: "Admin already Registered",
			});
		}
		// console.log(req.body);
		const { firstName, lastName, email, password } = req.body;

		const _user = new User({
			firstName,
			lastName,
			email,
			password,
			username: Math.random().toString(),
			role: "admin",
        });
        // console.log(_user)

		_user.save((error, data) => {
			if (error) {
				return res.status(400).json({
					message: "Something went Wrong",
				});
			}
			if (data) {
				return res.status(201).json({
					message: "Admin Created Successfully",
				});
			}
		});
	});
};

exports.signin = (req, res) => {
	User.findOne({ email: req.body.email }).exec((err, user) => {
		if (err) return res.status(400).json({ err });
		if (user) {
			if (user.authenticate(req.body.password) && user.role === "admin") {
				//token creation

				const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
					expiresIn: "12h",
				});
				const { _id, firstName, lastName, email, role, fullName } = user;
				//token sending
				res.status(200).json({
					token,
					user: {
						_id,
						firstName,
						lastName,
						email,
						role,
						fullName,
					},
				});
			} else {
				return res.status(400).json({
					message: "Invalid Credentials",
				});
			}
		} else {
			return res.status(400).json({ message: "Something went Wrong" });
		}
	});
};

// exports.requireSignin = (req, res, next) => {
// 	const token = req.headers.authorization.split(" ")[1];
// 	const user = jwt.verify(token, process.env.JWT_SECRET);
// 	req.user = user;
// 	// console.log(token)

// 	next();
// };
