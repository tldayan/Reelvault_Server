const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    username : {
        type:String,
        required:true
    },
    password : { 
        type : String,
        required : true
    },
    userShowsDetails : [{
        showId: String,
        showName: String,
        poster_url: String,
        showSeason: Number,
        showEpisode: Number
    }],
    refreshToken : String

})


module.exports = mongoose.model("User", userSchema)// //mongoose automatically changes "User" to "users" when interacting with MongoDB