let express       = require("express");
let userRouter    = require("./src/route/user.route.js"); 
let accountRouter = require("./src/route/account.route.js");
let validateJSON  = require("./src/middleware/validatejson.middleware.js");
let {json}        = require("body-parser");
let fetchToken    = require("./src/middleware/tfetch.middleware.js");
let fetchBody     = require("./src/middleware/bfetch.middleware.js");
let fetchSSN      = require("./src/middleware/ssnfetch.middleware.js");
let serverError   = require("./src/middleware/serror.middleware.js");
let app           = express();
let port          = require("./config.js")["port"];

//-----------------------------------------------------------------------------

app.use(json());
app.use(validateJSON);
app.use(fetchToken);
app.use(fetchSSN);
app.use(fetchBody);

app.use("/user"    , userRouter);
app.use("/account" , accountRouter);

app.use(serverError);

//-----------------------------------------------------------------------------

app.listen(port , () => {
    console.log(`:: http://localhost:${port}/`);
})