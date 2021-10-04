const id = require("uniqid");

const generateID = () => id();
const keyExists  = (id , obj) => Object.keys(obj).indexOf(id) !== -1 

//-----------------------------------------------------------------------------

function Manager() {
	this.users = {}
}

//-----------------------------------------------------------------------------

Manager.prototype.addUser = function(username , age) {
	this.users[generateID()] = {
		username : username ,
		age      : age
	}
}

//-----------------------------------------------------------------------------

Manager.prototype.getUsers = function() {
	return this.users;
}

//-----------------------------------------------------------------------------

Manager.prototype.deleteUser = function(id) {
	if(!keyExists(id , this.users)) return false;
	return delete this.users[id];
}

//-----------------------------------------------------------------------------

Manager.prototype.updateUser = function(id , username , age) {
	if(!keyExists(id , this.users)) return false;
	let d = this.users[id];
	d["username"] = username;
	d["age"]      = age;

	return true;
}

//-----------------------------------------------------------------------------


module.exports = Manager;