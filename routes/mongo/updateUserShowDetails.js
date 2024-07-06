

const express = require("express")
const User = require("../../mongo/models/User")
const router = express.Router()


const updateUserShowDetails = async(req,res) => {
    const userId = req.body.userId
    const showDetails = req.body.showDetails

    if(!userId || !showDetails) {
       return res.sendStatus(400);
    } 
    
    const foundUser = await User.findOne({userId}).exec()

    if(foundUser) {

        if(foundUser.userShowsDetails.length >= 1) {

            const currentShowObj = foundUser.userShowsDetails.find((eachShow) => eachShow.showId === showDetails.showId);

            if(currentShowObj) {

                currentShowObj.showSeason = showDetails.showSeason,
                currentShowObj.showEpisode = showDetails.showEpisode
            } else {
               foundUser.userShowsDetails.push(showDetails) 
            }
            
        } else {
            foundUser.userShowsDetails = [showDetails]
        }
        
        await foundUser.save()
        return res.sendStatus(200)
    } else {
        return res.sendStatus(400)
    }

}

router.route("/").post(updateUserShowDetails)

module.exports = router