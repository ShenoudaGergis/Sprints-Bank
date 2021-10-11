let Card             = require("./card.js");

//-----------------------------------------------------------------------------

function Account(balance , type , PIN) {
    this.card    = (new Card(PIN)).generate(); 
    this.balance = balance;
    switch (type) {
        case "saving"  : this.type = 0;break;
        case "current" : this.type = 1;break;
    }
}

//-----------------------------------------------------------------------------

Account.prototype.getAccountNo = function() {
    return this.card["number"].toString().substr(7)
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

module.exports = Account;