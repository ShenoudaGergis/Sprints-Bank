let db     = require("./db.js");
let dbname = require("../../config.js")["mysql_dbname"];


//-----------------------------------------------------------------------------

function createTables() {
	let tables = [
		{
			sql: `CREATE TABLE IF NOT EXISTS users (
					SSN BIGINT UNSIGNED PRIMARY KEY , 
					first_name varchar(255) NOT NULL , 
					last_name varchar(255) NOT NULL , 
					email varchar(255) NOT NULL , 
					password varchar(255) NOT NULL ,
					phone BIGINT UNSIGNED NOT NULL , 
					address varchar(255) NOT NULL);` , 
			params: []
		} ,
		{
			sql: `CREATE TABLE IF NOT EXISTS cards (
					number BIGINT UNSIGNED PRIMARY KEY , 
					network_type varchar(255) NOT NULL , 
					expiry_date TEXT NOT NULL ,
					CVV SMALLINT UNSIGNED NOT NULL , 
					PIN SMALLINT UNSIGNED NOT NULL);` , 
			params: []
		} ,
		{
			sql: `CREATE TABLE IF NOT EXISTS accounts (
					account_no INT UNSIGNED PRIMARY KEY , 
					balance REAL DEFAULT 0.0 , 
					account_type TINYINT UNSIGNED NOT NULL , 
					card_id BIGINT UNSIGNED NOT NULL , 
					user_id BIGINT UNSIGNED NOT NULL ,
					FOREIGN KEY (user_id)
   						REFERENCES users(SSN)
  				        ON UPDATE CASCADE 
				        ON DELETE CASCADE ,
					FOREIGN KEY (card_id)
   						REFERENCES cards(number)
  				        ON UPDATE CASCADE 
				        ON DELETE CASCADE);` , 
			params: []
		} ,
		{
			sql: `CREATE TABLE IF NOT EXISTS transactions (
					id MEDIUMINT UNSIGNED PRIMARY KEY AUTO_INCREMENT ,
					transaction_type TINYINT SIGNED NOT NULL , 
					transaction_date TEXT DEFAULT CURRENT_TIMESTAMP , 
					amount REAL NOT NULL ,
					account_id INT UNSIGNED NOT NULL ,
					FOREIGN KEY (account_id)
   						REFERENCES accounts(account_no)
  				        ON UPDATE CASCADE 
				        ON DELETE CASCADE)` , 
			params: []
		} ,
		{
			sql: `CREATE TABLE IF NOT EXISTS tokens (
					token VARCHAR(255) PRIMARY KEY ,
					user_id BIGINT UNSIGNED NOT NULL , 
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

//-----------------------------------------------------------------------------

function createDatabase() {
    return db.exec(`CREATE DATABASE IF NOT EXISTS ${dbname}`);
}

//-----------------------------------------------------------------------------

function useDatabase() {
    return db.exec(`USE ${dbname}`);
}

//-----------------------------------------------------------------------------

function init() {
	process.stdout.write(":: Selecting database ... ")
	return useDatabase().then(() => {
		process.stdout.write(" OK\n")
		process.stdout.write(":: Creating tables    ... ")
		return createTables();
	}).then(() => {
		process.stdout.write(" OK\n")
	})
}

//-----------------------------------------------------------------------------


init();