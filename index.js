//import express library
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8000;

const expressLayouts = require("express-ejs-layouts");

//database connection
const db = require("./config/mongoose");

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./assets"));
app.use(expressLayouts);
//use express router
app.use("/", require("./routes/routes"));

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//set up ejs view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//run the server
app.listen(port, (error) => {
  if (error) {
    console.log("Error in server running server : ", error);
  }
  console.log("Server is running on port : ", port);
});
