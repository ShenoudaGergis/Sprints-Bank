let db                          = require("../database/db.js");
let { getToken , getTimestamp } = require("../utils/misc.js");
let session_timeout             = require("../../config.js")["session_timeout"];

//-----------------------------------------------------------------------------

function Token() {
    this.db = db;
}

//-----------------------------------------------------------------------------

Token.prototype.createEntry = function(SSN) {
    return this.getTokenfromSSN(SSN).then((token) => {
        if(token !== null) return { token , SSN };
        let uuid = getToken();
        return this.db.exec("INSERT INTO tokens (token , user_id , expiry_date) VALUES (?,?,?)" , [uuid , SSN , getTimestamp(session_timeout)]).then(() => {
            return {
                token : uuid ,
                SSN   : SSN
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
    return this.db.fetchOne("SELECT user_id from tokens WHERE token=? AND expiry_date > ?" , [token , getTimestamp()]).then((res) => {
        return (res["user_id"]) ? res["user_id"] : null; 
    })
}

//-----------------------------------------------------------------------------

Token.prototype.getTokenfromSSN = function(SSN) {
    return this.db.fetchOne("SELECT token from tokens WHERE user_id=? AND expiry_date > ?" , [SSN , getTimestamp()]).then((res) => {
        return (res["token"]) ? res["token"] : null; 
    })
}

//-----------------------------------------------------------------------------

module.exports = Token;