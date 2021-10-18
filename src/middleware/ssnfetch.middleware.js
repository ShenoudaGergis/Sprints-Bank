const tokenModel = new (require("../model/token.model.js"))();

const fetchSSN = (req , res , next) => {
    let token = req.credentials["token"];
    if(token === null) {
        req.credentials["ssn"] = null;
        return next();
    } else {
        tokenModel.getSSNfromToken(token).then((SSN) => {
            req.credentials["ssn"] = SSN;
            return next();    
        } , (err) => {
            next(err);
        });
    }
}

module.exports = fetchSSN;