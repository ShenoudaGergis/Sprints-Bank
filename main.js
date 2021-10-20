let express       = require("express");
let https         = require("https");
let path          = require("path");
let fs            = require("fs");
let userRouter    = require("./src/route/user.route.js"); 
let accountRouter = require("./src/route/account.route.js");
let validateJSON  = require("./src/middleware/validatejson.middleware.js");
let {json}        = require("body-parser");
let fetchToken    = require("./src/middleware/tfetch.middleware.js");
let fetchBody     = require("./src/middleware/bfetch.middleware.js");
let fetchSSN      = require("./src/middleware/ssnfetch.middleware.js");
let serverError   = require("./src/middleware/serror.middleware.js");
let fallback      = require("./src/middleware/fallback.middleware.js");
let app           = express();
let port          = require("./config.js")["server_port"];
let cert_path     = require("./config.js")["cert_path"];


//-----------------------------------------------------------------------------

app.use(json());
app.use(validateJSON);
app.use(fetchToken);
app.use(fetchSSN);
app.use(fetchBody);

app.use("/user"    , userRouter);
app.use("/account" , accountRouter);

app.use(serverError);
app.use(fallback);

//-----------------------------------------------------------------------------

https.createServer({
    key  : fs.readFileSync(path.join(cert_path , "key.pem")) ,
    cert : fs.readFileSync(path.join(cert_path , "cert.pem"))
} , app).listen(port , () => {
    console.log(`:: https://localhost:${port}/`);
});

