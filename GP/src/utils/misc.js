const { nanoid } = require('nanoid');
const moment     = require("moment");
const {account_types , currency_after_point} = require("../../config.js");

//-----------------------------------------------------------------------------

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//-----------------------------------------------------------------------------

function getToken() {
    return nanoid()
}

//-----------------------------------------------------------------------------

function getTimestamp(m=null) {
    if(m === null) return moment().format("YYYY-MM-DDTHH:mm:ss");
    return moment().add(m , "minutes").format("YYYY-MM-DDTHH:mm:ss");
}

//-----------------------------------------------------------------------------

function getAccountTypeByNumber(n) {
    for(let type in account_types) {
        if(account_types[type] == n) return type;
    }
    return "";
}

//-----------------------------------------------------------------------------

function getNumOfDigits(n) {
    return n.toString().length;
}

//-----------------------------------------------------------------------------

function isDigitPlace(n , p , v) {
    return n.toString()[p] == v;
}

//-----------------------------------------------------------------------------

function sumOperands(...numbers) {
    let sum = 0;
    numbers.forEach((n) => {
        sum += parseFloat(n);
    });
    return (sum.toFixed(currency_after_point[currency_after_point.length - 1]));
}

//-----------------------------------------------------------------------------

module.exports = {getRandomInt , getToken , getTimestamp , getAccountTypeByNumber , getNumOfDigits , isDigitPlace , sumOperands};
