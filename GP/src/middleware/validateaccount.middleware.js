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
        "type"    : {value : inputs["type"] , check     : "account_type" , args : []} ,
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
        "account_no" : {value : inputs["account_no"]  , check : "account_no" , args : []} ,
        "amount"     : {value : inputs["amount"]  , check : "currency" , args : [{digits_after_decimal: [0,1,2,3,4,5]}]} ,
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
        "number" : {value : inputs["number"]  , check : "creditCard" , args : []} ,
        "cvv"    : {value : inputs["cvv"]  , check : "cvv" , args : []} ,
        "pin"    : {value : inputs["pin"]  , check : "pin" , args : []} ,
        "amount" : {value : inputs["amount"]  , check : "currency" , args : [{digits_after_decimal: [0,1,2,3,4,5]}]} ,
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

module.exports = { validateOpenAccount , validateCloseAccount , validateTransactionAccount , validateBankingAccount , validateBankingCard };