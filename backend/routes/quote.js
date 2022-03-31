const express = require("express");
const router = express.Router(); 

var controller = require("../controllers/quote.controller");

router.get("/",  controller.index); 
router.get("/:id",  controller.info); 
router.post("/", controller.post); 
router.put("/", controller.update); 
router.delete("/:id", controller.delete); 

module.exports = router;