
const express = require("express")
const User = require("../../mongo/models/User")
const router = express.Router()

const getIsUserExisting = async(req,res) => {

  try {

    const {userId} = req.query.userId

    const existingUser = await User.findOne({userId}).exec()

    if(!existingUser) {
      return res.send({"message" : false})
    }

    return res.send({"message" : true})
  } catch (err) {
    console.log(err.message)
  } 
}


router.route("/").get(getIsUserExisting)

module.exports = router