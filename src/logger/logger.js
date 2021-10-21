let path    = require("path");
let fs      = require("fs");
let { log_path , log_verbose }         = require("../../config.js");
let { getLogFileName , getTimestamp }  = require("../utils/misc.js"); 

//-----------------------------------------------------------------------------

function formatLogContent(req , res) {
    let out = `[ ${(res.statusCode === 500) ? "ERROR" : "INFO"} ] [ ${ getTimestamp() } ] [ ${req.originalUrl} ] [ ${JSON.stringify(req.body)} ] [ ${JSON.stringify(req.params)} ] [ ${res.statusCode} ]\r\n`
    if(log_verbose) process.stdout.write(out);
    return out;
}

//-----------------------------------------------------------------------------

function logger(req , res) {
    let filename = path.join(log_path , getLogFileName());
    fs.appendFile(filename  , formatLogContent(req , res) , {encoding : "utf-8"} , (err) => {});
}

//-----------------------------------------------------------------------------

module.exports = logger;