const tokenModel = new (require("../model/token.model.js"))();

const createEntry = (SSN) => {
    return tokenModel.createEntry(SSN);
}

const removeEntry = (token) => {
    return tokenModel.removeEntry(token);
}

const getSSNfromToken = (token) => {
    return tokenModel.getSSNfromToken(token);
}

const getTokenfromSSN = (SSN) => {
    return tokenModel.getTokenfromSSN(SSN);
}

module.exports = { createEntry , removeEntry , getTokenfromSSN , getSSNfromToken };