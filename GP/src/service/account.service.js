let accountModel     = new (require("../model/account.model.js"))();
let transactionModel = new (require("../model/transaction.model.js"))();

//-----------------------------------------------------------------------------

function withdraw(SSN , account_no , amount) {
	return  accountModel.getAccountBalance(SSN , account_no).then((balance) => {
		if(balance === null) return {error: 1 , message: "No account found"};
		if(balance["balance"] < amount) return {error: 1 , message: "Not enough balance"};
		return accountModel.updateAccountBalance(SSN , account_no , (balance - amount)).then(() => {
			return transactionModel.createAccountTransaction(-1 , amount , account_no).then(() => 
			({
				error  : 0 ,
				message: "Transaction succeeded" , 
				balance: (balance - amount)
			}));
		});
	} , () => ({
        error   : 1 ,
        message : "Internal server error"
    }));
}

//-----------------------------------------------------------------------------

function deposite(SSN , account_no , amount) {
	return accountModel.getAccountBalance(SSN , account_no).then((balance) => {
		if(balance === null) return {error: 1 , message: "No account found"};
		return accountModel.updateAccountBalance(SSN , account_no , (balance + amount)).then(() => {
			return transactionModel.createAccountTransaction(1 , amount , account_no).then(() => 
				({
					error  : 0 ,
					message: "Transaction succeeded" , 
					balance: (balance + amount)
				}));
		});
	} , () => ({
        error   : 1 ,
        message : "Internal server error"
    }));
}

//-----------------------------------------------------------------------------

function withdrawByCard(number , CVV , PIN , amount) {
	return accountModel.getAccountNoFromCard(number , CVV , PIN).then((res) => {
		if(res === null) return {
			error: 1 ,
			message: "No corresponding account associated"
		}
		return withdraw(res["SSN"] , res["account_no"] , amount);
	} , () => ({
        error   : 1 ,
        message : "Internal server error"
    }))
}

//-----------------------------------------------------------------------------

function depositeByCard(number , CVV , PIN , amount) {
	return accountModel.getAccountNoFromCard(number , CVV , PIN).then((res) => {
		if(res === null) return {
			error: 1 ,
			message: "No corresponding account associated"
		}
		return deposite(res["SSN"] , res["account_no"] , amount);
	} , () => ({
        error   : 1 ,
        message : "Internal server error"
    }))
}

//-----------------------------------------------------------------------------

function transfer(source , destination , amount) {
    return withdrawByCard(source.number , source.CVV , source.PIN , amount).then((result) => {
        if(result["error"] === 0) {
            return depositeByCard(destination.number , destination.CVV , destination.PIN , amount);
        } else return result;
    } , () => ({
        error   : 1 ,
        message : "Internal server error"
    }))
}

//-----------------------------------------------------------------------------

function openAccount(SSN , balance , type , PIN) {
    return accountModel.openAccount(SSN , balance , type , PIN).then((account) => ({
        error   : 0 ,
        message : "Account created successfully" ,
        account : account
    }) , () => ({
        error   : 1 ,
        message : "Internal server error"
    }))
}

//-----------------------------------------------------------------------------

function closeAccount(SSN , account_no) {
    return accountModel.closeAccount(SSN , account_no).then((rows) => {
        if(rows == 1) return {
            error   : 0 ,
            message : "Account deleted successfully" ,    
        }
        else return {
            error   : 1 ,
            message : "No account matched" ,
        }
    } , () => ({
        error   : 1 ,
        message : "Internal server error"
    }))
}

//-----------------------------------------------------------------------------


module.exports = { withdraw , deposite , withdrawByCard , depositeByCard , transfer };