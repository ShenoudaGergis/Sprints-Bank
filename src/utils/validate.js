const validator        = require("validator");
const configs          = require("../../config.js");
const {getNumOfDigits} = require("../utils/misc.js");

validator["isSSN"] = (ssn) => {
	return (validator.isInt(ssn) && getNumOfDigits(+ssn) === configs.ssn_length);
}

validator["isPIN"] = (PIN) => {
	return (validator.isInt(PIN) && getNumOfDigits(+PIN) === configs.pin_length);
}

validator["isCVV"] = (CVV) => {
	return (validator.isInt(CVV) && getNumOfDigits(+CVV) === configs.cvv_length);
}

validator["isAccountNumber"] = (account_no) => {
	return (validator.isInt(account_no) && getNumOfDigits(+account_no) === configs.account_number_length);
}

validator["isAccountType"] = (type) => {
	type = type.toLocaleLowerCase();
	return (configs.account_types[type]) ? true : false;
}

validator["isName"] = (name) => {
	return (validator.isLength(name , {min: configs.name_length.min , max: configs.name_length.max})) && (validator.isAlpha(name));
}

validator["isAddress"] = (name) => {
	return validator.isLength(name , {min: configs.address_length.min , max: configs.address_length.max});
}

validator["_isCurrency"] = (currency) => {
	return validator.isCurrency(currency , {digits_after_decimal: configs.currency_after_point});
}

validator["_isMobilePhone"] = (phone) => {
	return validator.isMobilePhone(phone , configs.phone_local);
}

const mapper = {
	"ssn"          : "isSSN" ,
	"email" 	   : "isEmail" ,
	"name"         : "isName" ,
	"phone"        : "_isMobilePhone" ,
	"password"     : "isStrongPassword" , 
	"creditCard"   : "isCreditCard" ,
	"address"      : "isAddress" ,
	"currency"     : "_isCurrency",
	"pin"          : "isPIN" ,
	"cvv"          : "isCVV" ,
	"account_type" : "isAccountType" ,
	"account_no"   : "isAccountNumber"
};


const validate = (params) => {
	/*
		{
			"param" : {value : v , check : integer}
		}
	*/
	let errors = [];
	for(let p in params) {
		let value = params[p]["value"];
		if(!((typeof value === "string") || (typeof value === "number"))) {errors.push(p);continue;}
		value += "";
		let check = params[p]["check"];
		if(!(validator[mapper[check]](value))) errors.push(p);
	}
	return errors
}

module.exports = validate;