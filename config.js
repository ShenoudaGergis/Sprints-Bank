let path = require("path");

module.exports = {
    "mysql_hostname"        : "by7kjybdugervvsk3so9-mysql.services.clever-cloud.com" ,
    "mysql_username"        : "u4wrqnrngdlbueax" ,
    "mysql_password"        : "Ce2zPUCAy8kL53qZTTjc" ,
    "mysql_port"            : 3306 ,
    "mysql_dbname"          : "by7kjybdugervvsk3so9" ,
    "cert_path"             : path.resolve(__dirname , "./cert") ,
    "log_path"              : path.resolve(__dirname , "./logs") ,
    "log_verbose"           : true ,
    "session_timeout"       : 30 ,
    "server_port"           : process.env.PORT || 8080 ,
    "account_types"         : {"saving": 1 , "current": 2 , "payroll" : 3} ,
    "name_length"           : {min : 4 , max : 20} , 
    "address_length"        : {min : 5 , max : 30} ,
    "pin_length"            : 4 ,
    "cvv_length"            : 4 ,
    "ssn_length"            : 16 ,
    "phone_local"           : ["ar-EG"] ,
    "account_number_length" : 9 , 
    "card_expiry_years"     : 5 ,  
    "currency_after_point"  : [1,2,3,4,5] ,
}