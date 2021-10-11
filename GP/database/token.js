let db           = require("./db.js");
let { getToken } = require("../utils/misc.js");

//-----------------------------------------------------------------------------

function Token() {
    this.db = db;
}

//-----------------------------------------------------------------------------

Token.prototype.createEntry = function(SSN) {
    let uuid = getToken();
    return this.db.exec("INSERT INTO tokens (token , user_id) VALUES (?,?)" , [uuid , SSN]).then(() => {
        return {
            token: uuid ,
            SSN  : SSN
        }
    });
}

//-----------------------------------------------------------------------------

Token.prototype.removeEntry = function(token) {
    return this.db.exec("DELETE FROM tokens WHERE token=?" , [uuid]);
}

//-----------------------------------------------------------------------------

let token = new Token();
