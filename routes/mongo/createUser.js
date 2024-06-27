const express = require("express")
const User = require("../../mongo/models/User")
const router = express.Router()


const createUser = async(req,res) => {
  
  const {username}  = req.body

  try {

    const newUser = await User.create({
        "username" : username
      })

    res.status(201).json({"message" : `New user ${username} created`})
      
  } catch (err) {
    res.status(500).json({"message" : err.message})
  }

}

router.route("/").post(createUser)

module.exports = router;