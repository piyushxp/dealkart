const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

//import validator
const { nameValidator } = require("../utils/auth.validator");
const {
	addCategory,
	getAllCategory,
	getCategoryById,
    updateCategoryById,
    deleteCategoryById
} = require("../controllers/category.controller");

//CATEGORY ROUTES
router.post("/", nameValidator, auth, adminAuth, addCategory);
router.get("/all", getAllCategory);
router.get("/:categoryId", getCategoryById);
router.put("/:categoryId", auth, adminAuth, updateCategoryById);
router.delete("/:categoryId", auth, adminAuth,deleteCategoryById);

module.exports = router;
