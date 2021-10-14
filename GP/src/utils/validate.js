let validator = require("validator");

//-----------------------------------------------------------------------------

let mapper = {
	"integer"    : {f : "isInt"            , p : []} ,
	"length"     : {f : "isLength"         , p : [{ min : 8 }]} ,
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
		let value = (params[p]["value"] !== undefined) ? (params[p]["value"]).toString() : "";
		let check = params[p]["check"]
		let m     = mapper[check];

		if(!(validator[m["f"]](value , ...m["p"]))) errors.push(p);
	}
	return errors
}

//-----------------------------------------------------------------------------


module.exports = validate;

// console.log(validate({
// 	"email"    : {value : "kerolnasr@gmail.com"    , check : "email"} ,
// 	"password" : {value : "asdasdasdasd" , check : "length"} ,
// }));
