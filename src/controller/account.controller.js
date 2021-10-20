const accountService = require("../service/account.service.js");

//-----------------------------------------------------------------------------

function _open(req , res , next) {
    let inputs = req.user;
    let credentials = req.credentials;
    accountService.openAccount(credentials["ssn"] , inputs["balance"] , inputs["type"] , inputs["pin"]).then((account) => {
        return res.json(account);
    } , (err) => {
        next(err);
    });
}

//-----------------------------------------------------------------------------

function _close(req , res , next) {
    let inputs = req.user;
    let credentials = req.credentials;
    accountService.closeAccount(credentials["ssn"] , inputs["account_no"]).then((result) => {
        return res.json(result);
    } , (err) => {
        next(err);
    });
}

//-----------------------------------------------------------------------------

function _getTransaction(req , res , next) {
    let inputs = req.user;
    let credentials = req.credentials;
    accountService.getAccountTransaction(credentials["ssn"] , inputs["account_no"]).then((result) => {
        return res.json(result);
    } , (err) => {
        next(err);
    });
}

//-----------------------------------------------------------------------------

function _getBalance(req , res , next) {
    let inputs = req.user;
    let credentials = req.credentials;
    accountService.getAccountBalance(credentials["ssn"] , inputs["account_no"]).then((result) => {
        return res.json(result);
    } , (err) => {
        next(err);
    });
}

//-----------------------------------------------------------------------------

function _witdraw(req , res , next) {
    let inputs = req.user;
    let credentials = req.credentials;
    accountService.withdraw(credentials["ssn"] , inputs["account_no"] , inputs["amount"]).then((result) => {
        return res.json(result); 
    } , (err) => {
        next(err);
    })

}

//-----------------------------------------------------------------------------

function _deposite(req , res , next) {
    let inputs      = req.user;
    let credentials = req.credentials;
    accountService.deposite(credentials["ssn"] , inputs["account_no"] , inputs["amount"]).then((result) => {
        return res.json(result); 
    } , (err) => {
        next(err);
    })
}

//-----------------------------------------------------------------------------

function _transfer(req , res , next) {
    let source = req.user["source"];
    let dest   = req.user["destination"];
    let amount = req.user["amount"];
    accountService.transfer(source , dest , amount).then((result) => {
        return res.json(result); 
    } , (err) => {
        next(err);
    })
}

//-----------------------------------------------------------------------------

function _depositeByCard(req , res , next) {
    let inputs      = req.user;
    accountService.depositeByCard(inputs["number"] , inputs["cvv"] , inputs["pin"] , inputs["amount"]).then((result) => {
        return res.json(result); 
    } , (err) => {
        next(err);
    })
}

//-----------------------------------------------------------------------------

function _witdrawByCard(req , res , next) {
    let inputs      = req.user;
    accountService.withdrawByCard(inputs["number"] , inputs["cvv"] , inputs["pin"] , inputs["amount"]).then((result) => {
        return res.json(result); 
    } , (err) => {
        next(err);
    })
}

//-----------------------------------------------------------------------------

module.exports = {
    _open,
    _close,
    _getTransaction,
    _getBalance,
    _deposite,
    _witdraw,
    _transfer ,
    _depositeByCard,
    _witdrawByCard
};