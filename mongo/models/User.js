const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    userId : {
        type : String,
        required : true
    },
    username : {
        type:String,
        required:true
    },
/*     password : { 
        type : String,
        required : true
    }, */
    userShowsDetails : [{
        showId: String,
        showName: String,
        poster_url: String,
        showSeason: Number,
        showEpisode: Number
    }],
    watchlist: [{
        entityId: String,
        entityName: String,
        entityReleaseDate: String,
        entityPosterUrl: String,
        entityType: String,
        entityDescription: String
    }]
/*     refreshToken : String */

})


module.exports = mongoose.model("User", userSchema)// //mongoose automatically changes "User" to "users" when interacting with MongoDB