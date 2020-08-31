const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDatabase = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");

dotenv.config();
connectDatabase();

//Basics
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api", authRoutes);
app.use("/api", adminRoutes);

app.listen(process.env.PORT || 8000, () => {
	console.log(`Server is up @ ${process.env.PORT}`);
});
