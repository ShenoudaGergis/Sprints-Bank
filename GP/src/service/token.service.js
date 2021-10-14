let tokenModel = new (require("../model/token.model.js"))();

//-----------------------------------------------------------------------------

function createEntry(SSN) {
    return tokenModel.createEntry(SSN);
}

//-----------------------------------------------------------------------------

function removeEntry(token) {
    return tokenModel.removeEntry(token);
}

//-----------------------------------------------------------------------------

function getSSNfromToken(token) {
    return tokenModel.getSSNfromToken(token);
}

//-----------------------------------------------------------------------------

function getTokenfromSSN(SSN) {
    return tokenModel.getTokenfromSSN(SSN);
}



