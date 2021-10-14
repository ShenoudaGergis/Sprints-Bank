let userModel = new (require("../model/user.model.js"))();

//-----------------------------------------------------------------------------

function createUser(SSN , first_name , last_name , email , phone , address , password) {
    return userModel.createUser(SSN , first_name , last_name , email , phone , address , password).then((rows) => {
        if(rows == 0) return {
            error   : 1 ,
            message : "Can't create user" 
        } 
        else return {
            error   : 0 ,
            message : "User created successfully" 
        } 
    } , (err) => ({
        error   : 1 ,
        message : "Internal server error"
    }));
}

//-----------------------------------------------------------------------------

function updateUser(SSN , first_name , last_name , email , phone , address , password) {
    return userModel.updateUser(SSN , first_name , last_name , email , phone , address , password).then((rows) => {
        if(rows == 0) return {
            error   : 1 ,
            message : "Can't update user" 
        } 
        else return {
            error   : 0 ,
            message : "User updated successfully" 
        }  
    } , () => ({
        error   : 1 ,
        message : "Internal server error"
    }))
}

//-----------------------------------------------------------------------------

function deleteUser(SSN) {
    return userModel.deleteUser(SSN).then((rows) => {
        if(rows == 0) return {
            error   : 1 ,
            message : "Can't delete user"
        }
        else return {
            error   : 0 ,
            message : "User deleted successfully"
        }
    } , () => ({
        error   : 1 ,
        message : "Internal server error"
    }))
}

//-----------------------------------------------------------------------------



module.exports = { createUser , updateUser , deleteUser };