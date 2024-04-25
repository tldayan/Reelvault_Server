const express = require("express");
const User = require("../../mongo/models/User");
const router = express.Router();

const deleteShowDetails = async (req, res) => {
  const { username, showId } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.log("User not found");
      return res.sendStatus(404);
    }

    let isShowExist = user.userShowsDetails.some(eachShow => eachShow.showId === showId.toString())


    if(isShowExist) {
      user.userShowsDetails = user.userShowsDetails.filter(
        (show) => show.showId !== showId.toString()
      );

    await user.save();

    return res.sendStatus(200);
    }
    return res.sendStatus(404)
    
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Server error");
  }
};

router.route("/").delete(deleteShowDetails);

module.exports = router;
