
const express = require("express")
const User = require("../../mongo/models/User")
const router = express.Router()


const getUserShowDetails = async(req,res) => {

    const username = req.query.username

    const foundUser = await User.findOne({username}).exec()

    const userShowsData = foundUser.userShowsDetails
   
    if(foundUser && userShowsData.length >= 0) {
        return res.status(200).json({userShowsData})
    } else {
        return res.sendStatus(404)
    }

}


router.route("/").get(getUserShowDetails)

module.exports = router

