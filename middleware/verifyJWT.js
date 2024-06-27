const jwt = require("jsonwebtoken")
require('dotenv').config()


const verifyJWT = (req,res,next) => {
    
    /* const accessToken = req.cookies.jwt_access
    

    if(!accessToken) {
        return res.sendStatus(401)
    }

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403) // invalid token
            req.user = decoded.UserInfo.username
            next()
        }
    ) */


        const accessToken = req.cookies.stytch_session_jwt
        if(!accessToken) return res.sendStatus(401)
        next()

}

module.exports = verifyJWT