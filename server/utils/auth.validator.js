const { check } = require("express-validator");



//User Signup Validator
exports.userRegisterValidator = [
    // validation
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ];



//user Signin Validator
exports.userLoginValidator = [
	check("email").isEmail().withMessage("Must be a valid email is required"),
	check("password")
		.isLength({ min: 6 })
		.withMessage("password must be atleast 6 character long is required"),
];


// exports.forgotPasswordValidator = [
// 	check("email")
// 		.not()
// 		.isEmpty()
// 		.isEmail()
// 		.withMessage("Must be a valid email is required"),
// ];

// exports.resetPasswordValidator = [
// 	check("newPassword")
// 		.not()
// 		.isEmpty()
// 		.isLength({ min: 6 })
// 		.withMessage("Must be atleast 6 letter long "),
// ];
