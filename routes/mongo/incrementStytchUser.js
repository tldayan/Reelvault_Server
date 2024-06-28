const express = require("express")
const StytchLimit = require("../../mongo/models/StytchLimit")
const router = express.Router()


const incrementStytchUser = async(req,res) => {

  try {

    const stytchLimit = await StytchLimit.findOne()

      if(!stytchLimit) {
        stytchLimit = await StytchLimit.create({limit : 0})
      }
      
      if(stytchLimit.limit <= 100) {
        stytchLimit.limit++
        const result = await stytchLimit.save()
        return res.sendStatus(200)
      }

      return res.sendStatus(403)
      

  } catch(err) {
    return res.status(500).send({ message: 'Error incrementing limit', err })
  }
}

router.route("/").post(incrementStytchUser)


module.exports = router