const { nanoid } = require('nanoid');
const moment     = require("moment");

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

module.exports = {getRandomInt , getToken , getTimestamp};
