
const express = require("express");
const router = express.Router();
const multer = require("multer")  

var upload = multer({ dest: '/tmp/images'})

var controller = require("../controllers/image.controller");

router.post("/", upload.single('image'), controller.post); 

module.exports = router;