let express     = require("express");
let userService = require("../service/user.service.js");
let router      = express.Router();

//-----------------------------------------------------------------------------

router.post("/register" , (req , res , next) => {
    let inputs = req.user;
    userService.createUser(inputs.SSN , inputs.first_name , inputs.last_name , inputs.email , inputs.phone , inputs.address , inputs.password)
    .then((result) => {
        res.json(result);
    } , (err) => {
        next(err);
    });
})

//-----------------------------------------------------------------------------

router.put("/update" , (req , res , next) => {
    let inputs = req.user;
    userService.updateUser(inputs.SSN , inputs.first_name , inputs.last_name , inputs.email , inputs.phone , inputs.address , inputs.password)
    .then((result) => {
        res.json(result);
    } , (err) => {
        next(err);
    });
})

//-----------------------------------------------------------------------------

router.delete("/delete" , (req , res , next) => {
    let inputs = req.user;
    userService.deleteUser(inputs.SSN)
    .then((result) => {
        res.json(result);
    } , (err) => {
        next(err);
    });
})

//-----------------------------------------------------------------------------

router.post("/auth" , (req , res , next) => {
    let inputs = req.user;
    userService.createSession(inputs.email , inputs.password).then((result) => {
        res.json(result);
    } , (err) => {
        next(err);
    })
});

//-----------------------------------------------------------------------------

module.exports = router;