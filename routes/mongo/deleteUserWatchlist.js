
const express = require("express")
const User = require("../../mongo/models/User")
const router = express.Router()


const deleteUserWatchlist = async(req,res) => {

  let {entityId, userId} = req.query

  if (!userId || !entityId) {
    return res.sendStatus(400);
  }

  let user = await User.findOne({userId}).exec()

  if(!user){
    return res.sendStatus(404)
  }

  user.watchlist = user.watchlist.filter((eachEntity) => eachEntity.entityId !== entityId)

  await user.save()
  
  return res.status(200).json(user.watchlist)

}


router.route("/").delete(deleteUserWatchlist)

module.exports = router