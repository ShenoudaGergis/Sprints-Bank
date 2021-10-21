function fallback(req , res , next) {
    res.status(404).json({
        error   : 1 ,
        message : "Path not found"
    });
}

//-----------------------------------------------------------------------------

module.exports = fallback;