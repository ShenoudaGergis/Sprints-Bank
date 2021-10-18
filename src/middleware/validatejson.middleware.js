const validate = require("../utils/validate.js");

const checkJSON = (err , req , res , next) => {
    return res.json({
        error   : 1 ,
        message : "Invalid JSON form"
    });
}

module.exports = checkJSON;