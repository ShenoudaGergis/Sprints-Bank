const fetchParams = (req , res , next) => {
    if(!req.user) req.user = {};
    for(let key in req.params) {
        req.user[key.toLocaleLowerCase()] = (typeof req.params[key] === "string") ? req.params[key].trim() : req.params[key];
    }
    next();
}

module.exports = fetchParams;