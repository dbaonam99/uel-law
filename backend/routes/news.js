const express = require("express");
const router = express.Router(); 

var controller = require("../controllers/news.controller");

router.get("/",  controller.index); 
router.get("/:id",  controller.info); 
router.post("/content", controller.content); 
router.post("/", controller.post); 
router.put("/", controller.update); 
router.delete("/:id", controller.delete); 

module.exports = router;