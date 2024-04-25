const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router();
const User = require("../mongo/models/User");



const handleUserRegister = async (req,res) => {

    const {user,pwd} = req.body

   /*  console.log(user,pwd) */
   console.log("req cam for sign up")

    if(!user || !pwd)  {
        return res.status(400).json({"message" : "Username and password are required"})
    }
    
    const duplicate = await User.findOne({username : user}).exec()

    if(duplicate) {
        return res.status(409).json({"message" : `${user} already exists`})
    }

    try {
        const hashedPwd = await bcrypt.hash(pwd, 10)


        const result = await User.create({
            "username" : user,
            "password" : hashedPwd
        })

       /*  console.log(result) */

        res.status(201).json({"message" : `New user ${user} created`})

    } catch (err) {
        res.status(500).json({"message" : err.message})
    }
}


router.route("/").post(handleUserRegister);

module.exports = router;
