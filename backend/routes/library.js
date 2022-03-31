const express = require("express");
const router = express.Router(); 

var controller = require("../controllers/library.controller");

router.get("/",  controller.index);  
router.get("/:id",  controller.info); 
router.post("/", controller.post); 
router.delete("/:id", controller.delete); 
router.put("/", controller.update); 

module.exports = router;