let accountModel     = new (require("../model/account.model.js"))();
let transactionModel = new (require("../model/transaction.model.js"))();
let {sumOperands}    = require("../utils/misc.js");

//-----------------------------------------------------------------------------

function withdraw(SSN , account_no , amount) {
	return accountModel.getAccountBalance(SSN , account_no).then((balance) => {
		if(balance === null) return {error: 1 , message: "No account found"};
		if(balance < amount) return {error: 1 , message: "Not enough balance"};
		return accountModel.updateAccountBalance(SSN , account_no , sumOperands(balance , -amount)).then(() => {
			return transactionModel.createAccountTransaction(-1 , amount , account_no).then(() => 
			({
				error  : 0 ,
				message: "Transaction succeeded" , 
				balance: sumOperands(balance , -amount)
			}));
		});
	});
}

//-----------------------------------------------------------------------------

function deposite(SSN , account_no , amount) {
	return accountModel.getAccountBalance(SSN , account_no).then((balance) => {
		if(balance === null) return {error: 1 , message: "No account found"};
		return accountModel.updateAccountBalance(SSN , account_no , sumOperands(balance , amount)).then(() => {
			return transactionModel.createAccountTransaction(1 , amount , account_no).then(() => 
				({
					error  : 0 ,
					message: "Transaction succeeded" , 
					balance: sumOperands(balance , amount)
				}));
		});
	});
}

//-----------------------------------------------------------------------------

function withdrawByCard(number , CVV , PIN , amount) {
	return accountModel.getAccountNoFromCard(number , CVV , PIN).then((res) => {
		if(res === null) {
			return {
				error: 1 ,
				message: "No corresponding account associated"
			}
		}
		return withdraw(res["user_id"] , res["account_no"] , amount);
	});
}

//-----------------------------------------------------------------------------

function depositeByCard(number , CVV , PIN , amount) {
	return accountModel.getAccountNoFromCard(number , CVV , PIN).then((res) => {
		if(res === null) {
			return {
				error: 1 ,
				message: "No corresponding account associated"
			}
		}
		return deposite(res["user_id"] , res["account_no"] , amount);
	});
}

//-----------------------------------------------------------------------------

function transfer(source , destination , amount) {
    return withdrawByCard(source.number , source.CVV , source.PIN , amount).then((result) => {
        if(result["error"] === 0) {
            return depositeByCard(destination.number , destination.CVV , destination.PIN , amount).then(() => {
                return {
                    error   : 0 ,
                    message : "Transfer succeeded"
                }
            })
        } else return result;
    })
}

//-----------------------------------------------------------------------------

function openAccount(SSN , balance , type , PIN) {
    return accountModel.openAccount(SSN , balance , type , PIN).then((account) => ({
        error   : 0 ,
        message : "Account created successfully" ,
        account : account
    }));
}

//-----------------------------------------------------------------------------

function closeAccount(SSN , account_no) {
	return accountModel.accountBelongsToUser(SSN , account_no).then((belongs) => {
		if(!belongs) {
			return {
				error   : 1 ,
				message : "User does not have account"
			}
		} else {
			return accountModel.closeAccount(SSN , account_no).then((rows) => {
				if(rows == 1) {
					return {
						error   : 0 ,
						message : "Account deleted successfully" ,    
					}
				}
				else {
					return {
						error   : 1 ,
						message : "No account deleted" ,
					}
				}
			});		
		}
	})
}

//-----------------------------------------------------------------------------

function getAccountTransaction(SSN , account_no) {
	return accountModel.accountBelongsToUser(SSN , account_no).then((belongs) => {
		if(!belongs) {
			return {
				error   : 1 ,
				message : "User does not have account"
			}			
		} else {
			return transactionModel.getAccountTransactions(SSN , account_no).then((transactions) => {
				return {
					error        : 0 ,
					transactions : transactions ,
					message      : "Account transaction list"
				}
			});
		}
	});
}

//-----------------------------------------------------------------------------

module.exports = { withdraw , deposite , withdrawByCard , depositeByCard , openAccount , closeAccount , transfer , getAccountTransaction };