const mongoose = require('mongoose')

const Schema = mongoose.Schema

const stytchLimitSchema = new Schema({
  limit: {
      type: Number,
      default: 0,
      required: true,
      unique: true // Ensures there's only one document with this schema
  }
});

module.exports = mongoose.model("StytchLimit", stytchLimitSchema)