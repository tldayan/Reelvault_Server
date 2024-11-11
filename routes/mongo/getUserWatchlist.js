
const express = require("express")
const User = require("../../mongo/models/User")
const router = express.Router()


const getUserWatchlist = async(req,res) => {

  const {userId} = req.query
  console.log(req)
  if(!userId) {
    return res.sendStatus(400)
  }

  try {

    const user = await User.findOne({userId})

      if(!user) {
        return res.sendStatus(404)
      }

      let userWatchlistObj = user.watchlist

      return res.status(200).json({userWatchlistObj})

  } catch(err) {
    console.log(err.message)
  }

}

router.get('/', getUserWatchlist)
module.exports = router