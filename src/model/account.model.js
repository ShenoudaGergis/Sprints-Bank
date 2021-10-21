let db            = require("../database/db.js");
let accountEntity = require("./entity/account.js");
let CardModel     = require("./card.model.js");
let {getAccountTypeByNumber} = require("../utils/misc.js");

//-----------------------------------------------------------------------------

function Account() {
    this.db   = db;
    this.card = new CardModel();
}

//-----------------------------------------------------------------------------

Account.prototype.openAccount = function(SSN , balance , type , PIN) {
	type = type.toLocaleLowerCase();
	let account = (new accountEntity(balance , type , PIN)).generate();


	return this.db.startTransaction().then(() => {
		return this.card.registerCard(account["card"]);
	}).then((cardID) => {
		return this.db.exec("INSERT INTO accounts (account_no , balance , account_type , card_id , user_id) VALUES (?,?,?,?,?)" , 
			[account["account_no"] , account["balance"] , account["type"] , cardID , SSN])
	}).then(() => {
		account["type"] = getAccountTypeByNumber(account["type"]);
		return this.db.commit().then(() => account); 
	 } , (err) => {
		return this.db.rollback().then(() => { 
			throw err;
		 })
	 })
}

//-----------------------------------------------------------------------------

Account.prototype.closeAccount = function(SSN , account_no) {
	return this.db.exec("DELETE FROM accounts WHERE account_no=? AND user_id=?" , [account_no , SSN]).then(() => {
		return this.db.affectedRows();
	});
}

//-----------------------------------------------------------------------------

Account.prototype.accountExists = function(account_no) {
	return this.db.fetchOne("SELECT count(1) AS c FROM accounts WHERE account_no=?" , [account_no]).then((res) => {
		return res["c"] == 1;
	})
}

//-----------------------------------------------------------------------------

Account.prototype.accountBelongsToUser = function(SSN , account_no) {
	return this.db.fetchOne("SELECT count(1) AS c FROM accounts WHERE user_id=? AND account_no=?" , 
						    [SSN , account_no]).then((res) => {
		return res["c"] == 1;
	})

}

//-----------------------------------------------------------------------------

Account.prototype.getAccountBalance = function(SSN , account_no) {
	return this.db.fetchOne("SELECT balance FROM accounts WHERE account_no=? AND user_id=?" , [account_no , SSN]).then((res) => {
		return (res["balance"]) ? res["balance"] : null;
	});
}

//-----------------------------------------------------------------------------

Account.prototype.updateAccountBalance = function(SSN , account_no , balance) {
	return this.db.exec(`UPDATE accounts SET balance=? WHERE account_no=? AND user_id=?` ,
		[balance , account_no , SSN]).then(() => {
            this.db.affectedRows();
        });
}

//-----------------------------------------------------------------------------

Account.prototype.getAccountNoFromCard = function(number , CVV , PIN) {
	let sql = 
	`SELECT account_no , user_id
	 FROM accounts
	 INNER JOIN cards ON cards.number = accounts.card_id
	 WHERE cards.number=? AND cards.CVV=? AND cards.PIN=? 
	`;
	return this.db.fetchOne(sql , [number , CVV , PIN]).then((res) => {
		return (res["account_no"]) ? res : null;
	})
}

//-----------------------------------------------------------------------------

module.exports = Account;