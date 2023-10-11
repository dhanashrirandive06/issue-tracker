// import express library
const express = require("express");

// use Router method from express
const router = express.Router();

// import homeController
const homeController = require("../controllers/home_controller");

//get methods
router.get("/", homeController.home);
router.get("/createproject", homeController.createproject);
router.get("/projectdetails/:id", homeController.projectdetails);
router.get("/createissue/:id", homeController.createissue);
router.get("/projectdetails/:id/showAll", homeController.showAll);

//post methods
router.post("/create", homeController.create);
router.post("/createIssue/:id", homeController.createIssue);
router.post("/projectdetails/:id/searchIssue", homeController.searchIssue);
router.post("/projectdetails/:id/filterIssue", homeController.filterIssue);

//export router
module.exports = router;
