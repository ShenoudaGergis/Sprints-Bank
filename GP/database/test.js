let generator = require('creditcard-generator');
let validator = require("validator");

let time = (new Date()).getTime() + (365 * 24 * 60 * 60 * 1000); 

console.log(new Date(time));