let express     = require("express");
let userService = require("../service/user.service.js");
let router      = express.Router();

//-----------------------------------------------------------------------------

router.post("/register" , (req , res , next) => {
    let inputs = req.body;
    userService.createUser(inputs.SSN , inputs.first_name , inputs.last_name , inputs.email , inputs.phone , inputs.address , inputs.password)
    .then((result) => {
        res.json(result);
    });
})

//-----------------------------------------------------------------------------

router.put("/update" , (req , res , next) => {
    let inputs = req.body;
    userService.updateUser(inputs.SSN , inputs.first_name , inputs.last_name , inputs.email , inputs.phone , inputs.address , inputs.password)
    .then((result) => {
        res.json(result);
    });
})

//-----------------------------------------------------------------------------

router.delete("/update" , (req , res , next) => {
    let inputs = req.body;
    userService.deleteUser(inputs.SSN)
    .then((result) => {
        res.json(result);
    });
})

//-----------------------------------------------------------------------------

router.post("/auth" , (req , res , next) => {
    let inputs = req.body;
    
});

module.exports = router;