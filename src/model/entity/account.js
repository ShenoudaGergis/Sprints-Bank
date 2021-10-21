let Card  = require("./card.js");
let { account_types , account_number_length } = require("../../../config.js");

//-----------------------------------------------------------------------------

function Account(balance , type , PIN) {
    this.card    = (new Card(PIN)).generate(); 
    this.balance = balance;
    this.type    = account_types[type]; 
}

//-----------------------------------------------------------------------------

Account.prototype.getAccountNo = function() {
    return this.card["number"].toString().substr(16 - account_number_length);
}

//-----------------------------------------------------------------------------

Account.prototype.generate = function() {
    return {
        "account_no" : this.getAccountNo() ,
        "card"       : this.card ,
        "balance"    : this.balance ,
        "type"       : this.type ,
    };
}

//-----------------------------------------------------------------------------

module.exports = Account;