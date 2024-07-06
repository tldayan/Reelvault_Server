const express = require("express")
const User = require("../../mongo/models/User")
const router = express.Router()


const createUser = async(req,res) => {

  const {username,userId}  = req.body

  const foundUser = await User.findOne({userId}).exec()

  if(foundUser) {
    return res.sendStatus(409)
  }

  try {

    const newUser = await User.create({
        "userId" : userId,
        "username" : username
      })

    res.status(201).json({"message" : `New user ${username} created`})
      
  } catch (err) {
    console.log(err.message)
    res.status(500).json({"message" : err.message})
  }

}

router.route("/").post(createUser)

module.exports = router;