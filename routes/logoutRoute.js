const User = require("../mongo/models/User")
const express = require("express");
const router = express.Router()


const handleLogout = async(req,res) => {

    const cookies = req.cookies
 
    if(!cookies?.jwt_refresh || !cookies?.jwt_access) {
        return res.sendStatus(204) // No content to send back
    }

    const refreshToken = cookies.jwt_refresh
    const accessToken = cookies.jwt_access ? cookies.jwt_access : null

    const foundUser = await User.findOne({refreshToken}).exec()
   
    if (foundUser) {
        foundUser.refreshToken = "";
        await foundUser.save();
    }


    if(accessToken) {
        res.clearCookie("jwt_access", {httpOnly : true, domain: "vercel.app", secure: true, sameSite: "secure"}) // Add 'secure: true' when in production
    }
    res.clearCookie("jwt_refresh", { httpOnly: true, domain: "vercel.app", secure: true, sameSite: "secure"}); // Add 'secure: true' when in production
    return res.sendStatus(200); // OK status to indicate successful logout


}

router.route("/").post(handleLogout)

module.exports = router