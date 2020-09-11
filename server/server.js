const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

require("dotenv").config({
	path: "./config/index.env",
});

// MongoDB
const connectDB = require("./config/db");
connectDB();

//Basics
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/user/", require("./routes/auth.route"));
app.use("/api/category/", require("./routes/category.route"));
// app.use('/api/product/', require('./routes/product.route'));

app.get("/", (req, res) => {
	res.send("Hello world");
});

// Page Not founded
app.use((req, res) => {
	res.status(404).json({
		msg: "This route doesnt Exist",
	});
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}!`);
});

// const express = require("express");
// const app = express();
// const morgan = require("morgan");
// const dotenv = require("dotenv");
// const connectDatabase = require("./config/db");
// const cors = require("cors");
// const authRoutes = require("./routes/authRoutes.js");
// const adminRoutes = require("./routes/adminRoutes.js");

// dotenv.config();
// connectDatabase();

// //Basics
// app.use(cors());
// app.use(morgan("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// //Routes
// app.use("/api", authRoutes);
// app.use("/api", adminRoutes);

// app.listen(process.env.PORT || 8000, () => {
// 	console.log(`Server is up @ ${process.env.PORT}`);
// });
