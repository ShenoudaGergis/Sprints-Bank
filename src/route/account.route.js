const express = require("express");
const accountValidator = require("../middleware/validateaccount.middleware.js");
const fetchParams = require("../middleware/pfetch.middleware.js");
const accountController = require("../controller/account.controller.js");
const router = express.Router({ mergeParams : true });

router.post("/open", accountValidator.validateOpenAccount, accountController._open);
router.delete("/close", accountValidator.validateCloseAccount, accountController._close);
router.post("/withdraw", accountValidator.validateBankingAccount, accountController._witdraw);
router.post("/deposite", accountValidator.validateBankingAccount, accountController._deposite);
router.post("/withdraw/card", accountValidator.validateBankingCard, accountController._witdrawByCard);
router.post("/deposite/card", accountValidator.validateBankingCard, accountController._depositeByCard);
router.get("/balance/:account_no", fetchParams, accountValidator.validateInquiry, accountController._getBalance);
router.get("/transaction/:account_no", fetchParams, accountValidator.validateInquiry, accountController._getTransaction);

module.exports = router;