const Category = require("../models/Category");
const mongoose = require('mongoose')

module.exports = async (req, res, next) => {
    const {categoryId} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(categoryId)){
        return res.status(403).json({
            errro:"category not found"
        })
    }
};
