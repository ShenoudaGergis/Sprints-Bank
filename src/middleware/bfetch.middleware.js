let { prepareObject } = require("../utils/misc.js");

function fetchBody(req , res , next) {
    if(!req.user) req.user = {};
    req.user = prepareObject(req.body);
    next();
}

//-----------------------------------------------------------------------------

module.exports = fetchBody;