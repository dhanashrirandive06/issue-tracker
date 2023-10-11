// import mongoose from mongoose libary
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/issue_tracker");
const db = mongoose.connection;

// printing error if any error occurred while connecting with database
db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

// connect to db
db.once("open", () => {
  console.log("Connected to Mongodb ");
});

// export db 
module.exports = db;
