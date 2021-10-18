const Card  = require("./card.js");
const account_types = require("../../../config.js")["account_types"];

function Account(balance , type , PIN) {
    this.card    = (new Card(PIN)).generate(); 
    this.balance = balance;
    this.type    = account_types[type]; 
}

Account.prototype.getAccountNo = function() {
    return this.card["number"].toString().substr(7)
}

Account.prototype.generate = function() {
    return {
        "account_no" : this.getAccountNo() ,
        "card"       : this.card ,
        "balance"    : this.balance ,
        "type"       : this.type ,
    };
}

module.exports = Account;