const express = require("express");
const router = express.Router(); 

var controller = require("../controllers/home.controller");

router.get("/", controller.index); 
router.put("/", controller.updateTitle); 
router.put("/:id", controller.updateEmail); 
router.post("/", controller.update); 

module.exports = router;