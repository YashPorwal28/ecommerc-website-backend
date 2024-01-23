require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { databaseConnection } = require("./utils/connection");
const { signup, signin } = require("./Routes/userRoute");
const cookieParser = require("cookie-parser");
const { sellerSignup, sellerSignin } = require("./Routes/sellerRoute");
const productRoutes = require('./Routes/producetCrudRoute')
const fileUpload = require('express-fileupload')
const app = express();
databaseConnection();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles: true, // specify whether to use temp files or not (default is false
  
}))
app.use("/api", signup);
app.use("/api", signin);
app.use("/api", sellerSignup);
app.use("/api", sellerSignin);
app.use("/api", productRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
