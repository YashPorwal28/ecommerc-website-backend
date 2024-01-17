const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.URL_DATABASE;

const databaseConnection = async function connectToDatabase() {
  try {
    await mongoose.connect(url);
    console.log("Connected to the database Successfull");
  } catch (err) {
    console.log("Error connection to database", err);
  }
};

module.exports = { databaseConnection };
