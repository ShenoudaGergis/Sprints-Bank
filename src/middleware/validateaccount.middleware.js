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
        "balance" : {value : inputs["balance"]  , check : "currency"} ,
        "type"    : {value : inputs["type"]     , check : "account_type"} ,
        "pin"     : {value : inputs["pin"]      , check : "pin"} ,
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
        "account_no" : {value : inputs["account_no"]  , check : "account_no"} ,
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

function validateInquiry(req , res , next) {
    let inputs           = req.user;
    let credentials      = req.credentials;
    if(credentials["ssn"] === null) {
        return res.json({
            error   : 1 ,
            message : "Authentication failed"
        });
    }
    let result = validate({
        "account_no" : {value : inputs["account_no"]  , check : "account_no"} ,
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

function validateBankingAccount(req ,res , next) {
    let inputs      = req.user;
    let credentials = req.credentials;
    if(credentials["ssn"] === null) {
        return res.json({
            error   : 1 ,
            message : "Authentication failed"
        });
    }
    let result = validate({
        "account_no" : {value : inputs["account_no"]  , check : "account_no"} ,
        "amount"     : {value : inputs["amount"]      , check : "currency"} ,
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

function validateBankingCard(req , res , next) {
    let inputs      = req.user;
    let result = validate({
        "number" : {value : inputs["number"]  , check : "creditCard"} ,
        "cvv"    : {value : inputs["cvv"]     , check : "cvv"} ,
        "pin"    : {value : inputs["pin"]     , check : "pin"} ,
        "amount" : {value : inputs["amount"]  , check : "currency"} ,
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

module.exports = { validateOpenAccount , validateCloseAccount , validateInquiry , validateBankingAccount , validateBankingCard };