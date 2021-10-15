let accountService   = require("../service/account.service.js");
let accountValidator = require("../middleware/validateaccount.middleware.js");
let express          = require("express");
let router           = express.Router();

//-----------------------------------------------------------------------------

router.post("/open" , accountValidator.validateOpenAccount , (req , res , next) => {
    let inputs = req.user;
    let credentials = req.credentials;
    accountService.openAccount(credentials["ssn"] , inputs["balance"] , inputs["type"] , inputs["pin"]).then((account) => {
        return res.json({
            error   : 0 ,
            account : account ,
            message : "Account created successfully"
        });
    } , (err) => {
        next(err);
    });
})

//-----------------------------------------------------------------------------

router.delete("/close" , accountValidator.validateCloseAccount , (req , res , next) => {
    let inputs = req.user;
    let credentials = req.credentials;
    accountService.closeAccount(credentials["ssn"] , inputs["account_no"]).then(() => {
        return res.json({
            error   : 0 ,
            message : "Account closed successfully"
        });
    } , (err) => {
        next(err);
    });
})

//-----------------------------------------------------------------------------

router.get("/transaction" , accountValidator.validateTransactionAccount , (req , res , next) => {
    let inputs = req.user;
    let credentials = req.credentials;
    accountService.getAccountTransaction(credentials["ssn"] , inputs["account_no"]).then((transactions) => {
        return res.json({
            error        : 0 ,
            transactions : transactions , 
            message      : "Account transactions list"
        });
    } , (err) => {
        next(err);
    });
})

//-----------------------------------------------------------------------------

module.exports = router;