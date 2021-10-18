let db = require("../database/db.js");

//-----------------------------------------------------------------------------

function Transaction() {
    this.db = db;
}

//-----------------------------------------------------------------------------

Transaction.prototype.getAccountTransactions = function(SSN , account_no) {
	let sql = 
	`SELECT transaction_type, transaction_date, amount 
		FROM transactions
		INNER JOIN accounts ON transactions.account_id = accounts.account_no
		WHERE account_id=? AND accounts.user_id=?
	`
	return this.db.fetchMany(sql , [account_no , SSN]).then((transactions) => {
		return transactions;
	});
}

//-----------------------------------------------------------------------------

Transaction.prototype.createAccountTransaction = function(type , amount , account_no) {
	return this.db.exec("INSERT INTO transactions VALUES (NULL , ? , CURRENT_TIMESTAMP , ? , ?)" , 
				[type , amount , account_no]
	).then(() => {
        return this.db.affectedRows();
    });
}

//-----------------------------------------------------------------------------

module.exports = Transaction;