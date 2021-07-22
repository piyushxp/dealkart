const app = require("./app");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

//Setting up config
dotenv.config();

//Db Connection
connectDB();

app.listen(process.env.PORT, () =>
	console.log(
		`Server is up @ ${process.env.PORT} in ${process.env.NODE_ENV} mode`
	)
);
