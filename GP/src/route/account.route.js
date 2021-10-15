let accountService = require("../service/account.service.js");
let express        = require("express");
let router         = express.Router();

//-----------------------------------------------------------------------------

router.post("/open" , (req , res , next) => {
    let inputs = req.user;
    accountService.openAccount(inputs.SSN , inputs.balance , inputs.type , inputs.PIN).then((account) => {
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

router.delete("/close" , (req , res , next) => {
    let inputs = req.user;
    accountService.closeAccount(inputs.SSN , inputs.account_no).then(() => {
        return res.json({
            error   : 0 ,
            message : "Account closed successfully"
        });
    } , (err) => {
        next(err);
    });
})

//-----------------------------------------------------------------------------

router.get("/transaction" , (req , res , next) => {
    let inputs = req.user;
    accountService.getAccountTransaction(inputs.SSN , inputs.account_no).then((transactions) => {
        return res.json({
            error        : 0 ,
            transactions : transactions , 
            message      : "Account transactions list"
        });
    } , (err) => {
        next(err);
    });
})

module.exports = router;