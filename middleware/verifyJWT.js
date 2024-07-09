const stytch = require('stytch')
require('dotenv').config()

const stytchClient = new stytch.Client({
  project_id: process.env.STYTCH_PROJECT_ID,
  secret: process.env.STYTCH_SECRET
});

const verifyJWT = async(req,res,next) => {
    
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

        if(!accessToken) {
            return res.sendStatus(409);
        }

        try {

            const stytchResponse = await stytchClient.sessions.authenticateJwt({session_jwt : accessToken})
            req.stytchUser = stytchResponse.user
            next()
            
        } catch (err) {
            console.log("verifyJWT Stopped")
            return res.sendStatus(409)
        }

}

module.exports = verifyJWT