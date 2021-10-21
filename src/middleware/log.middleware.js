let onFinished = require("on-finished");
let logger     = require("../logger/logger.js");

function log(req , res , next) {
    onFinished(res , (err) => {
        logger(req , res);
    })
    next();
}

//-----------------------------------------------------------------------------

module.exports = log;