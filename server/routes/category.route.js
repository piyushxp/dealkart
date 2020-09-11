const express = require("express");
const router = express.Router();


const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

//import validator
const { nameValidator } = require("../utils/auth.validator");
const {addCategory,getAllCategory,getCategoryById} = require('../controllers/category.controller')


//CATEGORY ROUTES
router.post("/", nameValidator, auth, adminAuth,addCategory);
router.get("/all", getAllCategory);
router.get("/:categoryId", getCategoryById);



module.exports = router;
