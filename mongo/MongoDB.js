const mongoose = require("mongoose")
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


let isConnected 

const connectDB = async() => {

    if(isConnected) {
        return
    }
    

    try {
        
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        isConnected = true
    } catch (err) {
        console.log(err.message)
        isConnected = false
    }
}

module.exports = connectDB