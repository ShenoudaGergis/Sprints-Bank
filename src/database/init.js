let db = require("./db.js");

//-----------------------------------------------------------------------------

function initTables() {
	let tables = [
		{
			sql: `CREATE TABLE IF NOT EXISTS users (
					SSN INTEGER PRIMARY KEY , 
					first_name TEXT NOT NULL , 
					last_name TEXT NOT NULL , 
					email TEXT NOT NULL , 
					password TEXT NOT NULL ,
					phone INTEGER NOT NULL , 
					address TEXT NOT NULL);` , 
			params: []
		} ,
		{
			sql: `CREATE TABLE IF NOT EXISTS accounts (
					account_no INTEGER PRIMARY KEY , 
					balance REAL DEFAULT 0.0 , 
					account_type INTEGER NOT NULL , 
					card_id INTEGER NOT NULL , 
					user_id INTEGER NOT NULL ,
					FOREIGN KEY (user_id)
   						REFERENCES users(SSN)
  				        ON UPDATE CASCADE 
				        ON DELETE CASCADE
					FOREIGN KEY (card_id)
   						REFERENCES cards(number)
  				        ON UPDATE CASCADE 
				        ON DELETE CASCADE);` , 
			params: []
		} ,
		{
			sql: `CREATE TABLE IF NOT EXISTS cards (
					network_type TEXT NOT NULL , 
					number INTEGER PRIMARY KEY NOT NULL , 
					expiry_date TEXT NOT NULL ,
					CVV INTEGER NOT NULL , 
					PIN INTEGER NOT NULL);` , 
			params: []
		} ,
		{
			sql: `CREATE TABLE IF NOT EXISTS transactions (
					id INTEGER PRIMARY KEY AUTOINCREMENT ,
					transaction_type INTEGER NOT NULL , 
					transaction_date TEXT DEFAULT CURRENT_TIMESTAMP , 
					amount REAL NOT NULL ,
					account_id INTEGER NOT NULL ,
					FOREIGN KEY (account_id)
   						REFERENCES accounts(account_no)
  				        ON UPDATE CASCADE 
				        ON DELETE CASCADE);` , 
			params: []
		} ,
		{
			sql: `CREATE TABLE IF NOT EXISTS tokens (
					token TEXT PRIMARY KEY ,
					user_id INTEGER NOT NULL , 
					expiry_date TEXT NOT NULL ,
					FOREIGN KEY (user_id)
   						REFERENCES users(SSN)
  				        ON UPDATE CASCADE 
				        ON DELETE CASCADE);` , 
			params: []
		} ,
	];

	let promises = [];
	tables.forEach((table) => {
		promises.push(db.exec(table.sql , table.params));
	})
	return Promise.all(promises);
}


initTables().then(() => {
    console.log(":: Tables initialized");
})