let userModel    = new (require("../model/user.model.js"))();
let tokenService = require("./token.service.js");

//-----------------------------------------------------------------------------

function createUser(SSN , first_name , last_name , email , phone , address , password) {
    return userModel.createUser(SSN , first_name , last_name , email , phone , address , password).then((rows) => {
        if(rows == 0) return {
            error   : 1 ,
            message : "No user created" 
        } 
        else return {
            error   : 0 ,
            message : "User created successfully" 
        } 
    });
}

//-----------------------------------------------------------------------------

function updateUser(SSN , first_name , last_name , email , phone , address , password) {
    return userModel.updateUser(SSN , first_name , last_name , email , phone , address , password).then((rows) => {
        if(rows == 0) return {
            error   : 1 ,
            message : "No user updated" 
        } 
        else return {
            error   : 0 ,
            message : "User updated successfully" 
        }  
    })
}

//-----------------------------------------------------------------------------

function deleteUser(SSN) {
    return userModel.deleteUser(SSN).then((rows) => {
        if(rows == 0) return {
            error   : 1 ,
            message : "No user delete"
        }
        else return {
            error   : 0 ,
            message : "User deleted successfully"
        }
    })
}

//-----------------------------------------------------------------------------

function createSession(email , password) {
    return userModel.getUserSSN(email , password).then((SSN) => {
        if(SSN === null) return {
            error   : 1 ,
            message : "User not found"
        } 
        else {
            return tokenService.createEntry(SSN).then((res) => {
                return { error: 0 , token : res["token"] , message : "Session created successfully" };
            })
        }
    });
}

//-----------------------------------------------------------------------------

module.exports = { createUser , updateUser , deleteUser , createSession };