const express = require("express");
const manager = new (require("./logic/"));
const app 	  = express();
const port    = 3000; 

//-----------------------------------------------------------------------------

app.get("/users" , function(req , res) {
	res.send(manager.getUsers());
})

//-----------------------------------------------------------------------------

app.post("/users/:username/:age" , function(req , res) {
	manager.addUser(req.params["username"] , req.params["age"]);
	res.send("user added");
})

//-----------------------------------------------------------------------------

app.put("/users/:id/:username/:age" , function(req , res) {
	let r    = manager.updateUser(req.params["id"] , req.params["username"] , req.params["age"]);
	let sent = (r) ? "user updated" : "no user found";
	res.send(sent); 
})

//-----------------------------------------------------------------------------

app.delete("/users/:id" , function(req , res) {
	let r    = manager.deleteUser(req.params["id"]);
	let sent = (r) ? "user deleted" : "no user found";
	res.send(sent); 
})

//-----------------------------------------------------------------------------

app.listen(port , function() {
	console.log(`server starts at ${port}`);
});