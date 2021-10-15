let validate = require("../utils/validate.js");

//-----------------------------------------------------------------------------

function validateRegisterUser(req , res , next) {
    let inputs = req.user;
    let result = validate({
        "SSN"      : {value : inputs["ssn"] , check : "ssn"  , args : [{min:16 , max:16}]} ,
        "email"    : {value : inputs["email"]  , check : "email" , args : []} ,
        "password" : {value : inputs["password"] , check : "password" , args : []} ,
        "first_name" : {value : inputs["first_name"] , check : "length" , args : [{min:5 , max:15}]} ,
        "first_name" : {value : inputs["first_name"] , check : "name" , args : []} ,
        "last_name" : {value : inputs["last_name"] , check : "length" , args : [{min:5 , max:15}]} ,
        "last_name" : {value : inputs["last_name"] , check : "name" , args : []} ,
        "phone" : {value : inputs["phone"] , check : "phone" , args : ["ar-EG"]} ,
        "address" : {value : inputs["address"] , check : "address" , args : []} 
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
        "email"    : {value : inputs["email"]  , check : "email" , args : []} ,
        "password" : {value : inputs["password"] , check : "password" , args : []} ,
        "first_name" : {value : inputs["first_name"] , check : "length" , args : [{min:5 , max:15}]} ,
        "first_name" : {value : inputs["first_name"] , check : "name" , args : []} ,
        "last_name" : {value : inputs["last_name"] , check : "length" , args : [{min:5 , max:15}]} ,
        "last_name" : {value : inputs["last_name"] , check : "name" , args : []} ,
        "phone" : {value : inputs["phone"] , check : "phone" , args : ["ar-EG"]} ,
        "address" : {value : inputs["address"] , check : "address" , args : []} 
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
        "email"    : {value : inputs["email"]  , check : "email" , args : []} ,
        "password" : {value : inputs["password"] , check : "length" , args : [{min:8}]} ,
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
