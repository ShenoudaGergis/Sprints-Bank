let db           = require("../database/db.js");
let { getToken } = require("../utils/misc.js");

//-----------------------------------------------------------------------------

function Token() {
    this.db = db;
}

//-----------------------------------------------------------------------------

Token.prototype.createEntry = function(SSN) {
    return this.getTokenfromSSN(SSN).then((token) => {
        if(token !== null) return { token , SSN };
        let uuid = getToken();
        return this.db.exec("INSERT INTO tokens (token , user_id) VALUES (?,?)" , [uuid , SSN]).then(() => {
            return {
                token: uuid ,
                SSN  : SSN
            }
        });
    })
}

//-----------------------------------------------------------------------------

Token.prototype.removeEntry = function(token) {
    return this.db.exec("DELETE FROM tokens WHERE token=?" , [uuid]).then(() => this.db.affectedRows())
}

//-----------------------------------------------------------------------------

Token.prototype.getSSNfromToken = function(token) {
    return this.db.fetchOne("SELECT SSN from tokens WHERE token=?" , [token]).then((res) => {
        return (res) ? res["SSN"] : null; 
    })
}

//-----------------------------------------------------------------------------

Token.prototype.getTokenfromSSN = function(SSN) {
    return this.db.fetchOne("SELECT token from tokens WHERE SSN=?" , [SSN]).then((res) => {
        return (res) ? res["token"] : null; 
    })
}

//-----------------------------------------------------------------------------

module.exports = Token;