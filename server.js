const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//env configuration
dotenv.config(); //write path in () if .env is in another folder

//db connection
connectDB();

//rest object
const app = express();

//port
const PORT = process.env.PORT || 8080;

//middlewares
app.use(cors());
app.use(express.json()); //to access clients data in json format
app.use(morgan("dev")); // it tells which url is hit and status code

//routes

app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/restro", require("./routes/restroRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));

app.get("/", (req, res) => {
  return res.status(200).send("<h1> welcome to food server app</h1>");
});

//listen
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
