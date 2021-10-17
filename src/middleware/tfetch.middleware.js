function fetchToken(req , res , next) {
    if(!req.user) req.credentials = {};
    let token = req.get("Authorization");
    if(!token) {
        req.credentials["token"] = null;
        return next();
    } else {
        let splitted = token.split(" ");
        if(splitted[0].toLocaleLowerCase() !== "bearer") {
            req.credentials["token"] = null;
            return next();    
        } else {
            req.credentials["token"] = splitted[1].split(",")[0];
            return next();    
        }
    }
}


module.exports = fetchToken;