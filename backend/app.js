const express = require("express");

const app = express();

//Import all routes
const products = require("./routes/product");

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", products);

module.exports = app;
