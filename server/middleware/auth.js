const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	//Get token from header first

	const token = req.header("x-auth-token");

	//check for no token
	if (!token) {
		return res.status(401).json({
			msg: "No token or Token has Expired.Authorisation denied",
		});
	}

	//If token,Verify Token
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		//Send the id as Req.user
		req.user = decoded.user;
		next();
	} catch (error) {
		req.status(401).json({
			msg: "Token is not Valid.Try Again",
		});
	}
};
