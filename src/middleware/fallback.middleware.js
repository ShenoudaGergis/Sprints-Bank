function fallback(req , res , next) {
    res.json({
        error   : 1 ,
        message : "Path not found"
    });
}

//-----------------------------------------------------------------------------

module.exports = fallback;