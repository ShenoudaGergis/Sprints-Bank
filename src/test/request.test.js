let https    = require("https");
let fs       = require("fs");
let moment   = require("moment");
let content  = require("./testcases.json");
let hostname = content["hostname"];
let protocol = content["protocol"];
let cases    = content["cases"];
let outFile  = "./result";
let getTestDate = require("../utils/misc.js")["getTestDate"];

//-----------------------------------------------------------------------------

function writeToFile(data) {
    fs.appendFile(outFile , data , {encoding: "utf8"} , () => {});
}

//-----------------------------------------------------------------------------

function doRequest(verbose=false) {
    writeToFile(`\n\n Tested at ${getTestDate()} \n\n ${"#".repeat(50)}`);
    cases.forEach((options) => {
        options["hostname"] = hostname;
        options["protocol"] = protocol;

        process.nextTick(() => {
            let request = https.request(options, (res) => {
                let chunks = "";
                res.on("end" , () => {
                    options["out"] = JSON.parse(chunks)
                    if(verbose) console.log(`\n\n${JSON.stringify(options , null , 4)} \n\n ${"#".repeat(50)}`);
                    writeToFile(`\n\n${JSON.stringify(options , null , 4)} \n\n ${"#".repeat(50)}`);
                });            
                res.on("data" , (r) => {
                    chunks += r.toString();
                });
            })
            request.end(JSON.stringify(options["body"]));
        });

    })  
}

//-----------------------------------------------------------------------------

doRequest();
