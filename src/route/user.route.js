const express = require("express");
const userValidator = require("../middleware/validateuser.middleware.js");
const userController = require("../controller/user.controller.js");
const router = express.Router();

router.post("/register", userValidator.validateRegisterUser, userController._register);
router.put("/update", userValidator.validateUpdateUser, userController._update);
router.delete("/delete" , userValidator.validateDeleteUser,userController._delete);
router.post("/auth" , userValidator.validateAuthUser, userController._auth);

module.exports = router;