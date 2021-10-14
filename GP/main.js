let express    = require("express");
let userRouter = require("./src/route/user.route.js"); 
let {json}     = require("body-parser");
let app        = express();
let port       = 3000;

app.use(json());
app.use("/user" , userRouter);

// app.post("/user/auth" , (req , res) => {
//     let body = req.body;
//     let result = validate({
//         "email"    : {value : body["email"]    , check : "email"} ,
//         "password" : {value : body["password"] , check : "length"} ,
//     });
//     if(result.length !== 0) {
//         return res.json({
//             error   : 1 ,
//             message : "Invalid parameters" ,
//             params  : result  
//         })    
//     }

//     bank.getUserSSN(body["email"] , body["password"]).then((SSN) => {
//         if(SSN === null) return res.json({
//             error   : 1 ,
//             message : "No user found" 
//         });
//         token.createEntry(SSN).then((r) => {
//             r["error"] = 0;
//             res.json(r)
//         });
//     })
// });

// //-----------------------------------------------------------------------------

// app.post("/user/register" , (req , res) => {
//     let body = req.body;
//     let result = validate({
//         "first_name" : {value : body["email"]    , check : "email"} ,
//         "last_name"  : {value : body["password"] , check : "length"} ,
//         "password" : {value : body["password"] , check : "password"} ,

//     });
//     if(result.length !== 0) {
//         return res.json({
//             error   : 1 ,
//             message : "Invalid parameters" ,
//             params  : result  
//         })    
//     }
// });


app.listen(port , () => {
    console.log(`http://localhost:${port}/`);
})