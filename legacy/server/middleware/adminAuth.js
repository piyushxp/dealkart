const User = require("../models/User");

module.exports = async (req, res, next) => {
	try {
		//Let's search for user info by the id that we get from preceeding auth middleware
		const user = await User.findOne({ _id: req.user.id });

		//Check for role of the User
		if (user.role === 0) {
			return res.status(403).json({
				error: "You dont have the Admin Privilage,Sorry!",
			});
		}

		next();
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
};
