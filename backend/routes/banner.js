const express = require("express");
const router = express.Router(); 

var controller = require("../controllers/banner.controller");

router.get("/", controller.index); 
router.post("/", controller.post); 

module.exports = router;