const express = require("express")
const User = require("../../mongo/models/User")
const router = express.Router()



const addUserWatchlist = async(req,res) => {

  const {entityObject,userId} = req.body

  if (!userId || !entityObject?.entityId) {
    return res.sendStatus(400); 
  }

  try {
    const user = await User.findOne({userId}).exec()

      if(!user) {
        return res.sendStatus(404)
      }

        if(user.watchlist.length === 0) {
          user.watchlist = [entityObject]
        } else {
          user.watchlist = [...user.watchlist, entityObject]
        }

      await user.save()

      return res.status(200).json(user.watchlist)
  } catch (err) {
    console.log(err.message)
    return res.sendStatus(500)
  }
}

router.route("/").post(addUserWatchlist)

module.exports = router