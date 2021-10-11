let db      = require("./db.js");
let Account = require("./account.js");

function Bank() {
	this.db = db;
}

//-----------------------------------------------------------------------------

Bank.prototype.createUser = function(
	SSN , first_name , last_name , email , phone , address , password
) {
	this.checkUser().then((found) => {
		if(!found) return {
			error: 1 ,
			message: "User already exists"
		}
		return this.db.exec(
			`INSERT INTO users (first_name , last_name , email , SSN , phone , address , password)
			 VALUES (? , ? , ? , ? , ? , ? , ?)
			` ,
			[first_name , last_name , email , SSN , phone , address , password]
		)	
	});
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

Bank.prototype.checkUser = function(SSN) {
	return this.db.fetchOne("SELECT count(1) AS c FROM users WHERE SSN=?" , [SSN]).then((res) => {
		return res["c"] == 1;
	})
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
	if(balance < 400) return Promise.resolve({
		error  : 1 ,
		message: "Not enough balance to open an account at least 400 pounds needed" 
	});
	let account = (new Account(balance , type , PIN)).generate();
	return this.registerCard(account["card"]).then((cardID) => {
		return this.db.exec("INSERT INTO accounts (account_no , balance , account_type , card_id , user_id) VALUES (?,?,?,?,?)" , 
					 [account["account_no"] , account["balance"] , account["type"] , cardID , SSN]).then(() => {
						 return {
							 error  : 0 ,
							 account: account ,
							 message: "Account created successfully"
						 }
					 })
	})	
}

//-----------------------------------------------------------------------------

Bank.prototype.deleteAccount = function(SSN , account_no) {
	return this.db.exec("DELETE FROM accounts WHERE account_no=? AND user_id=?" , [account_no , SSN]).then(() => {
		return this.db.affectedRows().then((rows) => {
			if(rows == 0) return {error: 1 , message: "User doesn't own account"};
			else return {error: 0 , message: "Account deleted successfully"};
		})
	});
}

//-----------------------------------------------------------------------------

Bank.prototype.checkAccount = function(account_no) {
	return this.db.fetchOne("SELECT count(1) AS c FROM accounts WHERE account_no=?" , [account_no]).then((res) => {
		return res["c"] == 1;
	})
}

//-----------------------------------------------------------------------------

Bank.prototype.accountBelongsToUser = function(SSN , account_no) {
	return this.db.fetchOne("SELECT count(1) AS c FROM accounts WHERE user_id=? AND account_no=?" , 
						    [SSN , account_no]).then((res) => {
		return res["c"] == 1;
	})

}

//-----------------------------------------------------------------------------

Bank.prototype.getBalance = function(SSN , account_no) {
	return this.db.fetchOne("SELECT balance FROM accounts WHERE account_no=? AND user_id=?" , [account_no , SSN]).then((res) => {
		return (res && "balance" in res) ? {error: 0 , balance: res["balance"]} : {error: 1 , message: "User doesn't own account"}; 
	});
}

//-----------------------------------------------------------------------------

Bank.prototype.updateAccountBalance = function(SSN , account_no , balance) {
	return this.db.exec(
		`UPDATE accounts SET balance=? WHERE account_no=? AND user_id=?
		` ,
		[balance , account_no , SSN])
}

//-----------------------------------------------------------------------------

Bank.prototype.withdraw = function(SSN , account_no , amount) {
	return this.getBalance(SSN , account_no).then((balance) => {
		if(balance["error"] === 1) return balance;
		if(balance["balance"] < amount) return {error: 1 , message: "Not enough balance"};
		return this.updateAccountBalance(SSN , account_no , (balance - amount)).then(() => {
			return this.addTransaction(-1 , amount , account_no).then(() => 
			({
				error  : 0 ,
				message: "Transaction succeeded" , 
				balance: (balance - amount)
			}));
		});
	});
}

//-----------------------------------------------------------------------------

Bank.prototype.deposite = function(SSN , account_no , amount) {
	return this.getBalance(account_no).then((balance) => {
		if(balance["error"] === 1) return balance;
		return this.updateAccountBalance(SSN , account_no , (balance + amount)).then(() => {
			return this.addTransaction(1 , amount , account_no).then(() => 
				({
					error  : 0 ,
					message: "Transaction succeeded" , 
					balance: (balance + amount)
				}));
		});
	});
}

//-----------------------------------------------------------------------------

Bank.prototype.getUserTransactions = function(SSN) {
	let sql = 
	`SELECT transaction_type, transaction_date, amount 
		FROM transactions
		INNER JOIN accounts ON transactions.account_id = account_no
		INNER JOIN users ON accounts.user_id = users.SSN
		WHERE users.SSN=?
	`
	return this.db.fetchMany(sql , [SSN]).then((transactions) => {
		return {
			error: 0 ,
			transactions: transactions
		}
	});
}

//-----------------------------------------------------------------------------

Bank.prototype.addTransaction = function(type , amount , account_no) {
	return this.db.exec("INSERT INTO transactions VALUES (NULL , ? , CURRENT_TIMESTAMP , ? , ?)" , 
				[type , amount , account_no]
	);
}

//-----------------------------------------------------------------------------

Bank.prototype.getAccountNoFromCard = function(number , CVV , PIN) {
	let sql = 
	`SELECT account_no , user_id
	 FROM accounts
	 INNER JOIN cards ON cards.id = accounts.card_id
	 WHERE cards.number=? AND cards.CVV=? AND cards.PIN=? 
	`;
	return this.db.fetchOne(sql , [number , CVV , PIN]).then((res) => {
		if(res) return {account_no: res["account_no"] , SSN: res["user_id"]};
		return null;
	})
}

//-----------------------------------------------------------------------------

Bank.prototype.withdrawByCard = function(number , CVV , PIN , amount) {
	return this.getAccountNoFromCard(number , CVV , PIN).then((res) => {
		if(res === null) return {
			error: 1 ,
			message: "No corresponding account associated"
		}
		return this.withdraw(res["SSN"] , res["account_no"] , amount);
	})
}

//-----------------------------------------------------------------------------

Bank.prototype.depositeByCard = function(number , CVV , PIN , amount) {
	return this.getAccountNoFromCard(number , CVV , PIN).then((res) => {
		if(res === null) return {
			error: 1 ,
			message: "No corresponding account associated"
		}
		return this.deposite(res["SSN"] , res["account_no"] , amount);
	})
}

//-----------------------------------------------------------------------------


let bank = new Bank();
// bank.openAccount(2342 , 2343334 , 1 , 3423).then(console.log);
// bank.getUserTransactions()
// bank.getUserTransactions(24153427).then(console.log);
// bank.deleteAccount(931371383);
// return bank.depositeByCard(5177243020282945 , 4130 , 9641 , 100).then(console.log);
// return bank.withdraw(20282945 , 24).then(console.log);
// return bank.checkUser(241534270).then(console.log);
// return bank.getAccountNoFromCard(5206533164706260 , 3421 , 4332).then(console.log);
// return bank.deposite(928269760 , 2).then(console.log);
// return bank.getBalance(931371383).finally(console.log);
// return bank.addTransaction(1 , 5342 , 20282945).then(console.log);
// return bank.openAccount(24153427 ,32312.23243, "current" , 9641).then(console.log);
// bank.createUser(24153427 , "jesus" , "christ" , "asdas@sasd.com" , 2143123 , "asd12" , "asd23ac#")
