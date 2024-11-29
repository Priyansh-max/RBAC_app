const jwt = require('jsonwebtoken');
const { secret } = require("../config")

const authmiddleware = (req,res,next) => {
    const authheader = req.headers.authorization;
    console.log("JWT_SECRET:", secret); 

    if(!authheader || !authheader.startsWith('Bearer ')){
        return res.status(403).json({});
    }
    const token = authheader.split(' ')[1];

    console.log(token);
    try{
        console.log("hi")
        const decoded = jwt.verify(token,secret)
        console.log("Decoded Token:", decoded);
        console.log("hi1")
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
