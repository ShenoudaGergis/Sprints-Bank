let validator = require("validator");

//-----------------------------------------------------------------------------

let mapper = {
	"integer"    : {f : "isInt"            , p : []} , 
	"float" 	 : {f : "isFloat"          , p : []} , 
	"email" 	 : {f : "isEmail" 		   , p : []} , 
	"name"       : {f : "isAlpha"          , p : []} ,
	"phone"      : {f : "isMobilePhone"    , p : ["ar-EG"]} ,
	"password"   : {f : "isStrongPassword" , p : []} , 
	"creditCard" : {f : "isCreditCard"     , p : []} ,
	"address"    : {f : "isAlphanumeric"   , p : []} ,
	"currency"   : {f : "isCurrency"       , p : []}
};

//-----------------------------------------------------------------------------

function validate(params) {
	/*
		{
			"param" : {value : v , check : integer}
		}
	*/
	let errors = [];
	for(let p in params) {
		let value = params[p]["value"];
		let check = params[p]["check"]
		let m     = mapper[check];

		if(!(validator[m["f"]](value , ...m["p"]))) errors.push(p);
	}
	return errors
}

//-----------------------------------------------------------------------------

function checkParamsExistence(obj , ...keys) {
	
}

module.exports = validate;

// validate({
// 	"age" : {value : "34" , check : "integer"}
// });