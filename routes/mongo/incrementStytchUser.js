const express = require("express");
const StytchLimit = require("../../mongo/models/StytchLimit");
const router = express.Router();

const incrementStytchUser = async (req, res) => {
  try {
    let stytchLimit = await StytchLimit.findOne();

    if (!stytchLimit) {
      stytchLimit = await StytchLimit.create({ limit: 0 });
    }

    if (stytchLimit.limit < 501) { // Ensure it's less than 50
      stytchLimit.limit++;
      await stytchLimit.save();
      return res.sendStatus(200);
    }

    return res.sendStatus(403); // Limit exceeded
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Error incrementing limit', err });
  }
};

router.route("/").post(incrementStytchUser);

module.exports = router;
