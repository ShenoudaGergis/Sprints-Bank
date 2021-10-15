let db = require("../database/db.js");

//-----------------------------------------------------------------------------

function User() {
    this.db = db;
}

//-----------------------------------------------------------------------------

User.prototype.createUser = function(SSN , first_name , last_name , email , phone , address , password) {
	return this.userExists(SSN).then((found) => {
		if(found) return this.db.affectedRows();
		return this.db.exec(
			`INSERT INTO users (first_name , last_name , email , SSN , phone , address , password)
			 VALUES (? , ? , ? , ? , ? , ? , ?)
			` ,
			[first_name , last_name , email , SSN , phone , address , password]
		).then(() => {
            return this.db.affectedRows();
        })	
	});
}

//-----------------------------------------------------------------------------

User.prototype.updateUser = function(SSN , first_name , last_name , email , phone , address , password) {
	return this.db.exec(
		`UPDATE users SET first_name=? , last_name=? , email=? , phone=? , address=? , password=?
		 WHERE SSN = ?
		` ,
		[first_name , last_name , email , phone , address , password , SSN]).then(() => {
            return this.db.affectedRows();
        })
}

//-----------------------------------------------------------------------------

User.prototype.deleteUser = function(SSN) {
	return this.db.exec("DELETE FROM users WHERE SSN=?" , [SSN]).then(() => {
        return this.db.affectedRows();
    })
}

//-----------------------------------------------------------------------------

User.prototype.userExists = function(SSN) {
	return this.db.fetchOne("SELECT count(1) AS c FROM users WHERE SSN=?" , [SSN]).then((res) => {
		return res["c"] == 1;
	})
}

//-----------------------------------------------------------------------------

User.prototype.getUserSSN = function(email , password) {
	return this.db.fetchOne("SELECT SSN FROM users WHERE email=? AND password=?" , [email , password]).then((res) => {
		if(res) return res["SSN"];
		return null;
	})
}

//-----------------------------------------------------------------------------

module.exports = User;

// let user = new User();
// user.userExists(324123123123).then(console.log);