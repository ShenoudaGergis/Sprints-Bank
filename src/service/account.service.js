const accountModel = new (require("../model/account.model.js"))();
const transactionModel = new (require("../model/transaction.model.js"))();
const {sumOperands} = require("../utils/misc.js");

const withdraw = (SSN , account_no , amount) => {
	return accountModel.getAccountBalance(SSN , account_no).then((balance) => {
		if(balance === null) return {error: 1 , message: "No account found"};
		if(amount <= 0) return {error: 1 , message: "Not valid amount"};
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

const deposite = (SSN , account_no , amount) => {
	return accountModel.getAccountBalance(SSN , account_no).then((balance) => {
		if(balance === null) return {error: 1 , message: "No account found"};
		if(amount <= 0) return {error: 1 , message: "Not valid amount"};
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

const withdrawByCard = (number , CVV , PIN , amount) => {
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

const depositeByCard = (number , CVV , PIN , amount) => {
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

const transfer = (source , destination , amount) => {
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

const openAccount = (SSN , balance , type , PIN) => {
    return accountModel.openAccount(SSN , balance , type , PIN).then((account) => ({
        error   : 0 ,
        message : "Account created successfully" ,
        account : account
    }));
}

const closeAccount = (SSN , account_no) => {
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

const getAccountTransaction = (SSN , account_no) => {
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

const getAccountBalance = (SSN , account_no) => {
	return accountModel.accountBelongsToUser(SSN , account_no).then((belongs) => {
		if(!belongs) {
			return {
				error   : 1 ,
				message : "User does not have account"
			}			
		} else {
			return accountModel.getAccountBalance(SSN , account_no).then((balance) => {
				return {
					error        : 0 ,
					transactions : balance ,
					message      : "Account balance"
				}
			});
		}
	});
}

module.exports = { withdraw , deposite , withdrawByCard , depositeByCard , openAccount , closeAccount , transfer , getAccountTransaction , getAccountBalance };