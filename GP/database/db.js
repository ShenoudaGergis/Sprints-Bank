let path    = require("path");
let sqlite3 = require("sqlite3").verbose();
const PATH  = path.resolve(__dirname , "./store" , "data.db");

function DB() {
	this.db = new Promise((resolve , reject) => {
		let db = new sqlite3.Database(PATH , (error) => {
			if(error) return reject(error);
			resolve(db);
		});
	}).then((db) => {
		return new Promise((resolve , reject) => {
			db.get("PRAGMA foreign_keys = ON;" , [] , (error) => {
				if(error) return reject(error);
				return resolve(db); 
			});
		});
	});
}

//------------------------------------------------------------------------

DB.prototype.exec = function(sql , params=[]) {
	return this.db.then((db) => {
		return new Promise((resolve , reject) => {
			db.run(sql , params , (error) => {
				if(error) return reject(error);
				resolve(db);
			});
		})
	});
}

//------------------------------------------------------------------------

DB.prototype.fetchOne = function(sql , params=[]) {
	return this.db.then((db) => {
		return new Promise((resolve , reject) => {
			db.get(sql , params , (error , result) => {
				if(error) return reject(error);
				resolve(result);
			});
		})
	});
}

//------------------------------------------------------------------------

DB.prototype.fetchMany = function(sql , params=[]) {
	return this.db.then((db) => {
		return new Promise((resolve , reject) => {
			db.all(sql , params , (error , result) => {
				if(error) return reject(error);
				resolve(result);
			});
		})
	});
}

//------------------------------------------------------------------------

DB.prototype.lastInsertedID = function() {
	return this.db.then((db) => {
		return this.fetchOne("SELECT last_insert_rowid() as id" , []).then(res => {
			return (res && "id" in res) ? res["id"] : null; 
		});
	});
}

//------------------------------------------------------------------------

DB.prototype.affectedRows = function() {
	return this.db.then((db) => {
		return this.fetchOne("SELECT changes() as affected_rows" , []).then((res) => {
			return res["affected_rows"];
		});
	});
}

//------------------------------------------------------------------------

module.exports = (new DB());

// let d = new DB();
