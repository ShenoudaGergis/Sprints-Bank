let express       = require("express");
let userService   = require("../service/user.service.js");

const _register = (req , res , next) => {
    let inputs = req.user;
    userService.createUser(inputs["ssn"] , inputs["first_name"] , inputs["last_name"] , inputs["email"] , inputs["phone"] , inputs["address"] , inputs["password"])
    .then((result) => {
        res.json(result);
    } , (err) => {
        next(err);
    });
}

const _update = (req , res , next) => {
    let inputs = req.user;
    let credentials = req.credentials;
    userService.updateUser(credentials["ssn"] , inputs["first_name"] , inputs["last_name"] , inputs["email"] , inputs["phone"] , inputs["address"] , inputs["password"])
    .then((result) => {
        res.json(result);
    } , (err) => {
        next(err);
    });
}

const _delete = (req , res , next) => {
    let credentials = req.credentials;
    userService.deleteUser(credentials["ssn"])
    .then((result) => {
        res.json(result);
    } , (err) => {
        next(err);
    });
}

const _auth = (req , res , next) => {
    let inputs = req.user;
    userService.createSession(inputs["email"] , inputs["password"]).then((result) => {
        res.json(result);
    } , (err) => {
        next(err);
    })
}

module.exports = {
    _register,
    _update,
    _delete,
    _auth
}