function fetchToken(req , res , next) {
    if(!req.user) req.user = {};
    let token = req.get("Authorization");
    if(!token) {
        req.user["token"] = null;
        return next();
    } else {
        let splitted = token.split(" ");
        if(splitted[0].toLocaleLowerCase() !== "bearer") {
            req.user["token"] = null;
            return next();    
        } else {
            req.user["token"] = splitted[1].split(",")[0];
            return next();    
        }
    }
}


module.exports = fetchToken;