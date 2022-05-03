const ErrorHandler = require("../utiles/errorhandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    //Wrong MongoDB ID error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400)
    }


    // Mongoose Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate ${object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400)
    }

    //Json Web Token Error
    if (err.name === "jsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again`;
        err = new ErrorHandler(message, 400)
    }



    //JWT Expire Error
    if (err.name === "tokenExpiredError") {
        const message = `Json Web Token is Expired, Try again`;
        err = new ErrorHandler(message, 400)
    }




    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}

