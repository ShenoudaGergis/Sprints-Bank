let tokenModel = new (require("../model/token.model.js"))();

//-----------------------------------------------------------------------------

function fetchSSN(req , res , next) {
    let token = req.user["token"];
    if(token === null) {
        req.user["SSN"] = null;
        return next();
    } else {
        tokenModel.getSSNfromToken(token).then((SSN) => {
            req.user["SSN"] = SSN;
            return next();    
        } , (err) => {
            next(err);
        });
    }
}

module.exports = fetchSSN;