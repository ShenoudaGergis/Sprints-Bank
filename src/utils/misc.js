const { nanoid } = require('nanoid');
const moment = require("moment");
const {account_types , currency_after_point} = require("../../config.js");

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getToken = () => {
    return nanoid()
}

const getTimestamp = (m=null) => {
    if(m === null) return moment().format("YYYY-MM-DDTHH:mm:ss");
    return moment().add(m , "minutes").format("YYYY-MM-DDTHH:mm:ss");
}

const getAccountTypeByNumber = (n) => {
    for(let type in account_types) {
        if(account_types[type] == n) return type;
    }
    return "";
}

const getNumOfDigits = (n) => {
    return n.toString().length;
}

const isDigitPlace = (n , p , v) => {
    return n.toString()[p] == v;
}

const sumOperands = (...numbers) => {
    let sum = 0;
    numbers.forEach((n) => {
        sum += parseFloat(n);
    });
    return (sum.toFixed(currency_after_point[currency_after_point.length - 1]));
}

module.exports = {getRandomInt , getToken , getTimestamp , getAccountTypeByNumber , getNumOfDigits , isDigitPlace , sumOperands};
