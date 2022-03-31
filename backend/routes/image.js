
const express = require("express");
const router = express.Router();
const multer = require("multer")  

var upload = multer({ dest: './public/images'})

var controller = require("../controllers/image.controller");

// router.get("/",  controller.index); 
router.post("/", upload.single('image'), controller.post); 


module.exports = router;