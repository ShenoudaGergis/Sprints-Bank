let validator     = require("validator");
let account_types = require("../../config.js")["account_types"];

//-----------------------------------------------------------------------------

validator["isSSN"] = function(ssn , option) {
	return (validator.isLength(ssn , {min: option.min , max: option.max})) && (validator.isInt(ssn));
}

//-----------------------------------------------------------------------------

validator["isPIN"] = function(PIN) {
	return (validator.isLength(PIN , {min: 4 , max: 4})) && (validator.isInt(PIN));
}

//-----------------------------------------------------------------------------

validator["isAccountNumber"] = function(account_no) {
	return (validator.isLength(account_no , {min: 10 , max: 10})) && (validator.isInt(account_no));
}

//-----------------------------------------------------------------------------

validator["isAccountType"] = function(type) {
	type = type.toLocaleLowerCase();
	return (account_types[type]) ? true : false;
}

//-----------------------------------------------------------------------------

let mapper = {
	"integer"    : "isInt" ,
	"length"     : "isLength" ,
	"ssn"        : "isSSN" ,
	"float" 	 : "isFloat" , 
	"email" 	 : "isEmail" , 
	"name"       : "isAlpha" ,
	"phone"      : "isMobilePhone" ,
	"password"   : "isStrongPassword" , 
	"creditCard" : "isCreditCard" ,
	"address"    : "isAlphanumeric" ,
	"currency"   : "isCurrency",
	"pin"        : "isPIN" ,
	"account"    : "isAccountType" ,
	"account_no" : "isAccountNumber"
};

//-----------------------------------------------------------------------------

function validate(params) {
	/*
		{
			"param" : {value : v , check : integer , args=[]}
		}
	*/
	let errors = [];
	for(let p in params) {
		// let value = (params[p]["value"] !== undefined) ? (params[p]["value"]).toString() : "";
		let value = params[p]["value"];
		if(value === null || value === undefined) value = "";
		else value += "";
		
		let check = params[p]["check"];
		let args  = params[p]["args"];
		if(!(validator[mapper[check]](value , ...args))) errors.push(p);
	}
	return errors
}

//-----------------------------------------------------------------------------


module.exports = validate;

// console.log(validate({
// 	"SSN"      : {value : "cccccccccccccccc" , check : "ssn"  , args : [{min:16 , max:16}]} ,
	// "balance"      : {value : "3.232233" , check : "currency" , args : [{digits_after_decimal: [0,1,2,3,4,5]}]} ,
// 	"account" : {value : "saVing" , check : "account" , args : []} ,
// }));

