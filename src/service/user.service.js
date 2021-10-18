const userModel = new (require("../model/user.model.js"))();
const tokenService = require("./token.service.js");

const createUser = (SSN , first_name , last_name , email , phone , address , password) => {
    return userModel.createUser(SSN , first_name , last_name , email , phone , address , password).then((rows) => {
        if(rows == 0) {
            return {
                error   : 1 ,
                message : "No user created, SSN or email is found" 
            } 
        } else {
            return {
                error   : 0 ,
                message : "User created successfully" 
            } 
        }
    });
}

const updateUser = (SSN , first_name , last_name , email , phone , address , password) => {
    return userModel.updateUser(SSN , first_name , last_name , email , phone , address , password).then((rows) => {
        if(rows == 0) {
            return {
                error   : 1 ,
                message : "No user updated" 
            } 
        }
        else { 
            return {
                error   : 0 ,
                message : "User updated successfully" 
            }  
        }
    })
}

const deleteUser = (SSN) => {
    return userModel.deleteUser(SSN).then((rows) => {
        if(rows == 0) {
            return {
                error   : 1 ,
                message : "No user delete"
            }
        }
        else {
            return {
                error   : 0 ,
                message : "User deleted successfully"
            }
        }
    })
}

const createSession = (email , password) => {
    return userModel.getUserSSN(email , password).then((SSN) => {
        if(SSN === null) {
            return {
                error   : 1 ,
                message : "User not found"
            }
        } 
        else {
            return tokenService.createEntry(SSN).then((res) => {
                return { error: 0 , token : res["token"] , message : "Session created successfully" };
            })
        }
    });
}

module.exports = { createUser , updateUser , deleteUser , createSession };