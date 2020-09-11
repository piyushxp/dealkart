const express = require("express");
const router = express.Router();


const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

//import validator
const { nameValidator } = require("../utils/auth.validator");
const {addCategory,getAllCategory} = require('../controllers/category.controller')


router.post("/", nameValidator, auth, adminAuth,addCategory);
router.get("/all", getAllCategory);


module.exports = router;
