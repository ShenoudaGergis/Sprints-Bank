let validate = require("../utils/validate.js");

//-----------------------------------------------------------------------------

function validateOpenAccount(req , res , next) {
    let inputs      = req.user;
    let credentials = req.credentials;
    if(credentials["ssn"] === null) {
        return res.json({
            error   : 1 ,
            message : "Authentication failed"
        });
    }
    let result = validate({
        "balance" : {value : inputs["balance"]  , check : "currency" , args : [{digits_after_decimal: [0,1,2,3,4,5]}]} ,
        "type"    : {value : inputs["type"] , check     : "account" , args : []} ,
        "pin"     : {value : inputs["pin"] , check      : "pin" , args : []} ,
   }); 
    if(result.length !== 0) {
        return res.json({
            error   : 1 ,
            message : "Invalid parameters" ,
            params  : result
        });
    } else return next();

}

//-----------------------------------------------------------------------------

function validateCloseAccount(req , res , next) {
    let inputs      = req.user;
    let credentials = req.credentials;
    if(credentials["ssn"] === null) {
        return res.json({
            error   : 1 ,
            message : "Authentication failed"
        });
    }
    let result = validate({
        "account_no" : {value : inputs["account_no"]  , check : "account_no" , args : []} ,
   }); 
    if(result.length !== 0) {
        return res.json({
            error   : 1 ,
            message : "Invalid parameters" ,
            params  : result
        });
    } else return next();

}

//-----------------------------------------------------------------------------

function validateTransactionAccount(req , res , next) {
    let inputs      = req.user;
    let credentials = req.credentials;
    if(credentials["ssn"] === null) {
        return res.json({
            error   : 1 ,
            message : "Authentication failed"
        });
    }
    let result = validate({
        "account_no" : {value : inputs["account_no"]  , check : "account_no" , args : []} ,
   }); 
    if(result.length !== 0) {
        return res.json({
            error   : 1 ,
            message : "Invalid parameters" ,
            params  : result
        });
    } else return next();

}

//-----------------------------------------------------------------------------

module.exports = { validateOpenAccount , validateCloseAccount , validateTransactionAccount };