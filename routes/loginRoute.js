const User = require("../mongo/models/User")
const path = require("path")
const express = require("express");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = express.Router()


const handleLogin = async(req,res) => {

    const {user,pwd} = req.body

    if(!user || !pwd) {
        return res.status(404).json({"message" : "User and password are required"})
    }

    const foundUser = await User.findOne({username : user}).exec()

    if(!foundUser) {
        return res.status(404).json({"message" : "You are not a registered user"})
    }

    try {

        const match = await bcrypt.compare(pwd, foundUser.password)

        if(match) {
            const accessToken = jwt.sign(
                {
                    "UserInfo" : {
                        "username" : foundUser.username
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {"expiresIn" : '300s'}
                
            )


            const refreshToken = jwt.sign(
                {"username" : foundUser.username},
                process.env.REFRESH_TOKEN_SECRET,
                {"expiresIn" : "15d"}
            )



            foundUser.refreshToken = refreshToken
            await foundUser.save()

            res.cookie("jwt_refresh", refreshToken, {httpOnly : true, maxAge : 15 * 24 * 60 * 60 * 1000, secure: true, sameSite: "Lax"}) // 15 Days
            res.cookie("jwt_access", accessToken, {httpOnly : true, maxAge: 300000, secure: true, sameSite: "Lax"}) // 5 Mins
            res.json({accessToken}) 

        } else {
            return res.status(401).json({"message" : "User not Authorized"})
        }

    
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }



}


router.route("/").post(handleLogin)

module.exports = router;