const jwt = require('jsonwebtoken');
const { secret } = require("../config")

const authmiddleware = (req,res,next) => {
    const authheader = req.headers.authorization;

    if(!authheader || !authheader.startsWith('Bearer ')){
        return res.status(403).json({});
    }
    const token = authheader.split(' ')[1];

    console.log(token);
    try{
        const decoded = jwt.verify(token,secret)
        req.userid = decoded.userid //send the userid with the request handler to all the routes where this middleware wil be used
        next();
    }catch(err){
        console.log(err);
        return res.status(403).json({
            message : "Authentication unsuccessful"
        })
    }
}

module.exports = authmiddleware;
