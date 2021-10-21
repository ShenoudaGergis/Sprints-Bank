var mysql    = require("mysql");
let hostname = require("../../config.js")["mysql_hostname"];
let username = require("../../config.js")["mysql_username"];
let password = require("../../config.js")["mysql_password"];
let port     = require("../../config.js")["mysql_port"];
let dbname   = require("../../config.js")["mysql_dbname"];


//-----------------------------------------------------------------------------

function DB() {
    this.db = new Promise((resolve , reject) => {
        let con = mysql.createConnection({
            host     : hostname , 
            user     : username ,
            password : password ,
            port     : port ,
        })
        con.connect((err) => {
            if(err) return reject(err);
            else return resolve(con);
        })
    }).then((con) => {
        return new Promise((resolve , reject) => {
            con.query(`CREATE DATABASE IF NOT EXISTS ${dbname}` , (err) => {
                if(err) return reject(err);
                else {
                    con.changeUser({database : dbname}, function(err) {
                        if (err) return reject(err);
                        else return resolve(con);
                    });
                }
            })  
        })
    })
}

//-----------------------------------------------------------------------------

DB.prototype.exec = function(sql , params = []) {
    return this.db.then((con) => {
        return new Promise((resolve , reject) => {
            con.query(sql , params , (err) => {
                if(err) return reject(err);
                else return resolve(con);
            });
        });
    })
}

//-----------------------------------------------------------------------------

DB.prototype.fetchOne = function(sql , params = []) {
    return this.db.then((con) => {
        return new Promise((resolve , reject) => {
            con.query(sql , params , (err , results) => {
                if(err) return reject(err);
                else {
                    if(results.length == 0) results = {};
                    else results = results[0];
                    return resolve(results);
                }
            });
        });
    })
}

//-----------------------------------------------------------------------------

DB.prototype.fetchMany = function(sql , params = []) {
    return this.db.then((con) => {
        return new Promise((resolve , reject) => {
            con.query(sql , params , (err , results) => {
                if(err) return reject(err);
                return resolve(results);
            });
        });
    })
}

//-----------------------------------------------------------------------------

DB.prototype.affectedRows = function(sql , params = []) {
    return this.db.then((con) => {
        return this.fetchOne("SELECT ROW_COUNT() as c" , []).then((result) => {
            return ("c" in result) ? result["c"] : null;
        });
    })
}

//-----------------------------------------------------------------------------

DB.prototype.startTransaction = function() {
    return this.db.then(() => {
        return this.exec("START TRANSACTION;" , []);
    });
}

//-----------------------------------------------------------------------------

DB.prototype.commit = function() {
    return this.db.then(() => {
        return this.exec("COMMIT;" , []);
    });
}

//-----------------------------------------------------------------------------

DB.prototype.rollback = function() {
    return this.db.then(() => {
        return this.exec("ROLLBACK;" , []);
    });
}

//-----------------------------------------------------------------------------

module.exports = (new DB());
