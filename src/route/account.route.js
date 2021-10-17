let accountService   = require("../service/account.service.js");
let accountValidator = require("../middleware/validateaccount.middleware.js");
let fetchParams      = require("../middleware/pfetch.middleware.js");
let express          = require("express");
let router           = express.Router({ mergeParams : true });

//-----------------------------------------------------------------------------

router.post("/open" , accountValidator.validateOpenAccount , (req , res , next) => {
    let inputs = req.user;
    let credentials = req.credentials;
    accountService.openAccount(credentials["ssn"] , inputs["balance"] , inputs["type"] , inputs["pin"]).then((account) => {
        return res.json(account);
    } , (err) => {
        next(err);
    });
})

//-----------------------------------------------------------------------------

router.delete("/close" , accountValidator.validateCloseAccount , (req , res , next) => {
    let inputs = req.user;
    let credentials = req.credentials;
    accountService.closeAccount(credentials["ssn"] , inputs["account_no"]).then((result) => {
        return res.json(result);
    } , (err) => {
        next(err);
    });
})

//-----------------------------------------------------------------------------

router.get("/transaction/:account_no" , fetchParams  , accountValidator.validateInquiry , (req , res , next) => {
    let inputs = req.user;
    let credentials = req.credentials;
    accountService.getAccountTransaction(credentials["ssn"] , inputs["account_no"]).then((result) => {
        return res.json(result);
    } , (err) => {
        next(err);
    });
})

//-----------------------------------------------------------------------------

router.get("/balance/:account_no" , fetchParams  , accountValidator.validateInquiry , (req , res , next) => {
    let inputs = req.user;
    let credentials = req.credentials;
    accountService.getAccountBalance(credentials["ssn"] , inputs["account_no"]).then((result) => {
        return res.json(result);
    } , (err) => {
        next(err);
    });
})

//-----------------------------------------------------------------------------

router.post("/withdraw" , accountValidator.validateBankingAccount , (req , res , next) => {
    let inputs      = req.user;
    let credentials = req.credentials;
    accountService.withdraw(credentials["ssn"] , inputs["account_no"] , inputs["amount"]).then((result) => {
        return res.json(result); 
    } , (err) => {
        next(err);
    })

})

//-----------------------------------------------------------------------------

router.post("/deposite" , accountValidator.validateBankingAccount , (req , res , next) => {
    let inputs      = req.user;
    let credentials = req.credentials;
    accountService.deposite(credentials["ssn"] , inputs["account_no"] , inputs["amount"]).then((result) => {
        return res.json(result); 
    } , (err) => {
        next(err);
    })
})

//-----------------------------------------------------------------------------

router.post("/deposite/card" , accountValidator.validateBankingCard , (req , res , next) => {
    let inputs      = req.user;
    accountService.depositeByCard(inputs["number"] , inputs["cvv"] , inputs["pin"] , inputs["amount"]).then((result) => {
        return res.json(result); 
    } , (err) => {
        next(err);
    })
})

//-----------------------------------------------------------------------------

router.post("/withdraw/card" , accountValidator.validateBankingCard , (req , res , next) => {
    let inputs      = req.user;
    accountService.withdrawByCard(inputs["number"] , inputs["cvv"] , inputs["pin"] , inputs["amount"]).then((result) => {
        return res.json(result); 
    } , (err) => {
        next(err);
    })
})

//-----------------------------------------------------------------------------

module.exports = router;