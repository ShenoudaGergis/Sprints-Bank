function fetchParams(req , res , next) {
    if(!req.user) req.user = {};
    req.user = prepareObject(req.params);
    next();
}

//-----------------------------------------------------------------------------

module.exports = fetchParams;