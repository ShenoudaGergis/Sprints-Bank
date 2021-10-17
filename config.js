let path = require("path");

module.exports = {
    "db_store"              : path.resolve(__dirname , "./data/data.db") ,
    "session_timeout"       : 30 ,
    "port"                  : 3000 ,
    "account_types"         : {"saving": 1 , "current": 2} ,
    "name_length"           : {min : 5 , max : 20} , 
    "address_length"        : {min : 5 , max : 30} ,
    "pin_length"            : 4 ,
    "cvv_length"            : 4 ,
    "ssn_length"            : 16 ,
    "phone_local"           : ["ar-EG"] ,
    "account_number_length" : 9 , 
    "currency_after_point"  : [1,2,3,4,5] ,
}