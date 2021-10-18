let moment           = require("moment");
let generator        = require("creditcard-generator");
let { getRandomInt , isDigitPlace } = require("../../utils/misc.js");

//-----------------------------------------------------------------------------

function Card(PIN) {
    this.network = "Mastercard";
    this.years   = 5;
    this.PIN     = PIN;
}

//-----------------------------------------------------------------------------

Card.prototype.getExpiryDate = function() {
    return moment().add(this.years , "years").format("YYYY-MM-DD");
}

//-----------------------------------------------------------------------------

Card.prototype.getCVV = function() {
    return getRandomInt(1000 , 9999);
}

//-----------------------------------------------------------------------------

Card.prototype.getNumber = function() {
    let r = null;
    while(isDigitPlace((r = generator.GenCC(this.network)[0]) , 7 , 0)) {}
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