let path = require("path");

module.exports = {
    "db_store" : path.resolve(__dirname , "./data/data.db") ,
    "session_timeout" : 30 ,
    "port" : 3000 ,
    "account_types" : {"saving": 1 , "current": 2}
}