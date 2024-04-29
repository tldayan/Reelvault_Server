const User = require("../mongo/models/User")
const path = require("path")
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const jwt = require("jsonwebtoken")
const express = require("express");
const router = express.Router()

const handleRefreshToken = async(req,res) => {
    
    const cookies = req.cookies

    if(!cookies.jwt_refresh) {
        return res.sendStatus(401) // if refreshToken is not there in the cookie of the client, then they are unauthorized
    }

    const refreshToken = cookies.jwt_refresh

    
    const foundUser = await User.findOne({refreshToken}).exec()


    if(!foundUser) return res.sendStatus(403) // the user does not have a refresh token, or has not created one

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded) => {

            if(err || foundUser.username !== decoded.username) {
                return res.sendStatus(403) // If token was tampered with, then the user is not allowed
            }


            const accessToken = jwt.sign(
                {
                    "UserInfo" : {
                        "username" : foundUser.username
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {"expiresIn" : "300s"}
            )


            res.cookie("jwt_access", accessToken, {httpOnly : true, domain: "vercel.app", maxAge : 300000, secure: true, sameSite: "None"})
            /* console.log(`access token sent to cookie, and username is ${foundUser.username}`) */
            res.sendStatus(200)
        }
    )
}

router.route("/").post(handleRefreshToken)

module.exports = router