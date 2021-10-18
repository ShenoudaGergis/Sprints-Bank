const serverError = (err , req , res , next) => {
    console.error(err);
    res.status(500).json({
        error   : 1 ,
        message : "Internal server error"    
    });
}

module.exports = serverError;