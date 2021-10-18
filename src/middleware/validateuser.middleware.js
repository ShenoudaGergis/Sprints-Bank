let validate = require("../utils/validate.js");

//-----------------------------------------------------------------------------

function validateRegisterUser(req , res , next) {
    let inputs = req.user;
    let result = validate({
        "SSN"        : {value : inputs["ssn"]        , check : "ssn"} ,
        "email"      : {value : inputs["email"]      , check : "email"} ,
        "password"   : {value : inputs["password"]   , check : "password"} ,
        "first_name" : {value : inputs["first_name"] , check : "name"} ,
        "last_name"  : {value : inputs["last_name"]  , check : "name"} ,
        "phone"      : {value : inputs["phone"]      , check : "phone"} ,
        "address"    : {value : inputs["address"]    , check : "address"} 
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

function validateUpdateUser(req , res , next) {
    let inputs      = req.user;
    let credentials = req.credentials;

    if(credentials["ssn"] === null) {
        return res.json({
            error   : 1 ,
            message : "Authentication failed"
        });
    }
    let result = validate({
        "email"      : {value : inputs["email"]      , check : "email"} ,
        "password"   : {value : inputs["password"]   , check : "password"} ,
        "first_name" : {value : inputs["first_name"] , check : "name"} ,
        "last_name"  : {value : inputs["last_name"]  , check : "name"} ,
        "phone"      : {value : inputs["phone"]      , check : "phone"} ,
        "address"    : {value : inputs["address"]    , check : "address"} 
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

function validateDeleteUser(req , res , next) {
    let credentials = req.credentials;
    if(credentials["ssn"] === null) {
        return res.json({
            error   : 1 ,
            message : "Authentication failed"
        });
    }
    return next();
}

//-----------------------------------------------------------------------------

function validateAuthUser(req , res , next) {
    let inputs = req.user;
    let result = validate({
        "email"    : {value : inputs["email"]    , check : "email"} ,
        "password" : {value : inputs["password"] , check : "password"} ,
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

module.exports = { validateRegisterUser , validateUpdateUser , validateDeleteUser , validateAuthUser };
