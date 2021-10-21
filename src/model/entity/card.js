let moment           = require("moment");
let generator        = require("creditcard-generator");
let { getRandomInt , isDigitPlace } = require("../../utils/misc.js");
let { cvv_length , account_number_length , card_expiry_years } = require("../../../config.js");

//-----------------------------------------------------------------------------

function Card(PIN) {
    this.network = "Mastercard";
    this.years   = card_expiry_years;
    this.PIN     = PIN;
}

//-----------------------------------------------------------------------------

Card.prototype.getExpiryDate = function() {
    return moment().add(this.years , "years").format("YYYY-MM-DD");
}

//-----------------------------------------------------------------------------

Card.prototype.getCVV = function() {
    return getRandomInt(cvv_length);
}

//-----------------------------------------------------------------------------

Card.prototype.getNumber = function() {
    let r = null;
    while(isDigitPlace((r = generator.GenCC(this.network)[0]) , 16 - account_number_length , 0)) {}
    return r;
}

//-----------------------------------------------------------------------------

Card.prototype.generate = function() {
    return {
        "network_type" : this.network ,
        "number"       : this.getNumber() ,
        "expiry_date"  : this.getExpiryDate() ,
        "CVV"          : this.getCVV() ,
        "PIN"          : this.PIN
    };
}

//-----------------------------------------------------------------------------

module.exports = Card;