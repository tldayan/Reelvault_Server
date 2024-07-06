const mongoose = require('mongoose')

const Schema = mongoose.Schema

const stytchLimitSchema = new Schema({
  limit: {
      type: Number,
      default: 0,
      required: true
  }
});

module.exports = mongoose.model("StytchLimit", stytchLimitSchema)