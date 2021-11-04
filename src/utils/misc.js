const { nanoid } = require('nanoid');
const moment     = require("moment");
const {account_types , currency_after_point} = require("../../config.js");

//-----------------------------------------------------------------------------

function getRandomInt(digits) {
    min = Math.ceil(Math.pow(10 , digits - 1));
    max = Math.floor(Math.pow(10 , digits) - 1);
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

function getLogFileName() {
    return `log_${moment().format("YYYY_MM_DD")}.log`;
}

//-----------------------------------------------------------------------------

function getTestDate() {
    return moment().format("YYYY:MM:DD HH:mm:ss");
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

function isObject(v) {
    return (typeof v === "object" &&
        !Array.isArray(v) &&
        v !== null);
}

//-----------------------------------------------------------------------------

function prepareObject(obj) {
    let newObj = {};
    for(let key in obj) {
        if((typeof obj[key]) === "string") { newObj[key.toLowerCase()] = obj[key].trim(); }
        else if(isObject(obj[key])) { newObj[key.toLowerCase()] = prepareObject(obj[key]); }
        else { newObj[key.toLowerCase()] = obj[key] }
    }
    return newObj;
}

//-----------------------------------------------------------------------------

module.exports = {getRandomInt , getToken , getTimestamp , getAccountTypeByNumber , getNumOfDigits , isDigitPlace , sumOperands , isObject , prepareObject , getLogFileName , getTestDate };
