let express       = require("express");
let userService   = require("../service/user.service.js");
let userValidator = require("../middleware/validateuser.middleware.js");
let router        = express.Router();

//-----------------------------------------------------------------------------

router.post("/register" , userValidator.validateRegisterUser , (req , res , next) => {
    let inputs = req.user;
    userService.createUser(inputs["ssn"] , inputs["first_name"] , inputs["last_name"] , inputs["email"] , inputs["phone"] , inputs["address"] , inputs["password"])
    .then((result) => {
        res.json(result);
    } , (err) => {
        next(err);
    });
})

//-----------------------------------------------------------------------------

router.put("/update" , userValidator.validateUpdateUser , (req , res , next) => {
    let inputs = req.user;
    let credentials = req.credentials;
    userService.updateUser(credentials["ssn"] , inputs["first_name"] , inputs["last_name"] , inputs["email"] , inputs["phone"] , inputs["address"] , inputs["password"])
    .then((result) => {
        res.json(result);
    } , (err) => {
        next(err);
    });
})

//-----------------------------------------------------------------------------

router.delete("/delete" , userValidator.validateDeleteUser , (req , res , next) => {
    let credentials = req.credentials;
    userService.deleteUser(credentials["ssn"])
    .then((result) => {
        res.json(result);
    } , (err) => {
        next(err);
    });
})

//-----------------------------------------------------------------------------

router.post("/auth" , userValidator.validateAuthUser , (req , res , next) => {
    let inputs = req.user;
    userService.createSession(inputs["email"] , inputs["password"]).then((result) => {
        res.json(result);
    } , (err) => {
        next(err);
    })
});

//-----------------------------------------------------------------------------

module.exports = router;