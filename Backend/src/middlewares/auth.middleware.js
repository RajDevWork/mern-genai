const jwt = require("jsonwebtoken")
const blackListTokenModel = require("../models/blacklisttoken.model")

async function authUser(req,res,next){
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:'Token not provided'
        })
    }
    //check for token blacklisting
    const isTokenBlacklisted = await blackListTokenModel.findOne({token})
    if(isTokenBlacklisted){
        return res.status(401).json({
            message:'Invalid Token'
        })
    }



    //verify the token
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()

    }catch(err){
        return res.status(401).json({
            message:'Invalid token'
        })
    }
}

module.exports = authUser