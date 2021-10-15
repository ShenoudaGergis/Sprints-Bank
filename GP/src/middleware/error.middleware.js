function serverError(err , req , res , next) {
    res.status(500).json({
        error   : 1 ,
        obj     : err ,
        message : "Internal server error"    
    });
}

module.exports = serverError;