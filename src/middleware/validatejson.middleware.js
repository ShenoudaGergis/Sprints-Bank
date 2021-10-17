let validate = require("../utils/validate.js");

//-----------------------------------------------------------------------------

function checkJSON(err , req , res , next) {
    return res.json({
        error   : 1 ,
        message : "Invalid JSON form"
    });
}

module.exports = checkJSON;