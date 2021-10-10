let DB      = require("./db.js");
let Account = require("./account.js");

function Bank() {
	this.db = new DB();
}

//-----------------------------------------------------------------------------

Bank.prototype.init = function() {
	let tables = [
		{
			sql: `CREATE TABLE IF NOT EXISTS users (
					SSN INTEGER PRIMARY KEY , 
					first_name TEXT NOT NULL , 
					last_name TEXT NOT NULL , 
					email TEXT NOT NULL , 
					password TEXT NOT NULL ,
					phone INTEGER NOT NULL , 
					address TEXT);` , 
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
   						REFERENCES cards(id)
  				        ON UPDATE CASCADE 
				        ON DELETE CASCADE);` , 
			params: []
		} ,
		{
			sql: `CREATE TABLE IF NOT EXISTS cards (
					id INTEGER PRIMARY KEY AUTOINCREMENT , 
					network_type TEXT NOT NULL , 
					number INTEGER NOT NULL , 
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
	];

	let promises = [];
	tables.forEach((table) => {
		promises.push(this.db.exec(table.sql , table.params));
	})

	return Promise.all(promises);
}

//-----------------------------------------------------------------------------

Bank.prototype.createUser = function(
	SSN , first_name , last_name , email , phone , address , password
) {
	return this.db.exec(
		`INSERT INTO users (first_name , last_name , email , SSN , phone , address , password)
		 VALUES (? , ? , ? , ? , ? , ? , ?)
		` ,
		[first_name , last_name , email , SSN , phone , address , password]
	)
}

//-----------------------------------------------------------------------------

Bank.prototype.updateUser = function(
	SSN , first_name , last_name , email , phone , address , password
) {
	return this.db.exec(
		`UPDATE users SET first_name=? , last_name=? , email=? , phone=? , address=? , password=?
		 WHERE SSN = ?
		` ,
		[first_name , last_name , email , phone , address , password , SSN])
}

//-----------------------------------------------------------------------------

Bank.prototype.deleteUser = function(SSN) {
	return this.db.exec("DELETE FROM users WHERE SSN=?" , [SSN]);
}

//-----------------------------------------------------------------------------

Bank.prototype.registerCard = function(card) {
	return this.db.exec("INSERT INTO cards (network_type , number , expiry_date , CVV , PIN) VALUES (?,?,?,?,?)" ,
				  [card.network_type , card.number , card.expiry_date , card.CVV , card.PIN]
	).then(() => {
		return this.db.lastInsertedID();
	});
}

//-----------------------------------------------------------------------------

Bank.prototype.openAccount = function(SSN , balance , type , PIN) {
	let account = (new Account(balance , type , PIN)).generate();
	return this.registerCard(account["card"]).then((cardID) => {
		return this.db.exec("INSERT INTO accounts (account_no , balance , account_type , card_id , user_id) VALUES (?,?,?,?,?)" , 
					 [account["account_no"] , account["balance"] , account["type"] , cardID , SSN]);
	})
}

//-----------------------------------------------------------------------------

Bank.prototype.deleteAccount = function(account_no) {
	return this.db.exec("DELETE FROM accounts WHERE account_no=?" , [account_no]);
}

//-----------------------------------------------------------------------------

Bank.prototype.getBalance = function(account_no) {
	return this.db.fetchOne("SELECT balance FROM accounts WHERE account_no=?" , [account_no]).then((res) => {
		return (res && "balance" in res) ? res["balance"] : null; 
	});
}

//-----------------------------------------------------------------------------

Bank.prototype.updateAccountBalance = function(account_no , balance) {
	return this.db.exec(
		`UPDATE accounts SET balance=? WHERE account_no = ?
		` ,
		[balance , account_no])
}

//-----------------------------------------------------------------------------

Bank.prototype.withdraw = function(account_no , amount) {
	return this.getBalance(account_no).then((balance) => {
		if((balance === null) || (balance < amount)) return Promise.resolve(false);
		return this.updateAccountBalance(account_no , (balance - amount)).then(() => true);
	});
}

//-----------------------------------------------------------------------------

Bank.prototype.deposite = function(account_no , amount) {
	return this.getBalance(account_no).then((balance) => {
		if(balance === null) return Promise.resolve(false);
		return this.updateAccountBalance(account_no , (balance + amount)).then(() => true);
	});
}

//-----------------------------------------------------------------------------

Bank.prototype.getUserTransactions = function(SSN) {
	let sql = 
	`SELECT transaction_type, transaction_date, amount 
	 FROM transactions
	 INNER JOIN accounts ON transactions.account_id = account_no
	 INNER JOIN users ON accounts.user_id = users.SSN
	 WHERE users.SSN=?`
	return this.db.fetchMany(sql , [SSN]);
}

//-----------------------------------------------------------------------------

Bank.prototype.addTransaction = function(type , amount , account_no) {
	return this.db.exec("INSERT INTO transactions VALUES (NULL , ? , CURRENT_TIMESTAMP , ? , ?)" , 
				[type , amount , account_no]
	);
}

//-----------------------------------------------------------------------------



let bank = new Bank();
bank.init().then(() => {
	// bank.getUserTransactions()
	// return bank.getUserTransactions(52341712).then(console.log);
	// bank.deleteAccount(931371383);
	// return bank.withdraw(928269760 , 2).then(console.log);
	// return bank.deposite(928269760 , 2).then(console.log);
	// return bank.getBalance(931371383).finally(console.log);
	// return bank.addTransaction(1 , 5342 , 20282945).then(console.log);
	// return bank.openAccount(24153427 ,32312.23243, "current" , 9641).then(console.log);
	// bank.createUser(24153427 , "jesus" , "christ" , "asdas@sasd.com" , 2143123 , "asd12" , "asd23ac#")
})