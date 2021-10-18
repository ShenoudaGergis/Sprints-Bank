const express = require("express");
const accountService = require("../service/account.service.js");

const _open = (req , res , next) => {
    let inputs = req.user;
    let credentials = req.credentials;
    accountService.openAccount(credentials["ssn"] , inputs["balance"] , inputs["type"] , inputs["pin"]).then((account) => {
        return res.json(account);
    } , (err) => {
        next(err);
    });
}

const _close = (req , res , next) => {
    let inputs = req.user;
    let credentials = req.credentials;
    accountService.closeAccount(credentials["ssn"] , inputs["account_no"]).then((result) => {
        return res.json(result);
    } , (err) => {
        next(err);
    });
}

const _getTransaction = (req , res , next) => {
    let inputs = req.user;
    let credentials = req.credentials;
    accountService.getAccountTransaction(credentials["ssn"] , inputs["account_no"]).then((result) => {
        return res.json(result);
    } , (err) => {
        next(err);
    });
}

const _getBalance = (req , res , next) => {
    let inputs = req.user;
    let credentials = req.credentials;
    accountService.getAccountBalance(credentials["ssn"] , inputs["account_no"]).then((result) => {
        return res.json(result);
    } , (err) => {
        next(err);
    });
}

const _witdraw = (req , res , next) => {
    let inputs = req.user;
    let credentials = req.credentials;
    accountService.withdraw(credentials["ssn"] , inputs["account_no"] , inputs["amount"]).then((result) => {
        return res.json(result); 
    } , (err) => {
        next(err);
    })

}

const _deposite = (req , res , next) => {
    let inputs      = req.user;
    let credentials = req.credentials;
    accountService.deposite(credentials["ssn"] , inputs["account_no"] , inputs["amount"]).then((result) => {
        return res.json(result); 
    } , (err) => {
        next(err);
    })
}

const _depositeByCard = (req , res , next) => {
    let inputs      = req.user;
    accountService.depositeByCard(inputs["number"] , inputs["cvv"] , inputs["pin"] , inputs["amount"]).then((result) => {
        return res.json(result); 
    } , (err) => {
        next(err);
    })
}

const _witdrawByCard = (req , res , next) => {
    let inputs      = req.user;
    accountService.withdrawByCard(inputs["number"] , inputs["cvv"] , inputs["pin"] , inputs["amount"]).then((result) => {
        return res.json(result); 
    } , (err) => {
        next(err);
    })
}

module.exports = {
    _open,
    _close,
    _getTransaction,
    _getBalance,
    _deposite,
    _witdraw,
    _depositeByCard,
    _witdrawByCard
};