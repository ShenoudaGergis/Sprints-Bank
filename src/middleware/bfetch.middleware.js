function fetchBody(req , res , next) {
    if(!req.user) req.user = {};
    for(let key in req.body) {
        req.user[key.toLocaleLowerCase()] = (typeof req.body[key] === "string") ? req.body[key].trim() : req.body[key];
    }
    next();
}

module.exports = fetchBody;