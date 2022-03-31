const express = require("express");
const router = express.Router(); 

var controller = require("../controllers/user.controller");
var middleware = require("../middlewares/token.middleware") 

router.get("/",  middleware.verifyToken, controller.index);
router.get("/list",  controller.list);
router.get("/list/:id",  controller.listId);
router.get("/:id",  middleware.verifyToken, controller.info); 
router.post("/login", controller.postLogin);
router.post("/register", controller.register);
router.post("/update/:id", controller.updateUser);
router.post("/delete/:id", controller.deleteUser);

module.exports = router;