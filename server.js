const express = require("express");
const cors = require("cors");
const credentials = require("./middleware/credentials");
const connectDB = require("./mongo/MongoDB");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require('cookie-parser');
const app = express()

const PORT = process.env.PORT || 3200;



app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());


/* app.use(credentials) */
app.use(cors(corsOptions));
/* app.options("*",cors(corsOptions)) */



connectDB()

app.use(cookieParser())


/* app.use("/signup", require("./routes/signupRoute"))
app.use("/login", require("./routes/loginRoute"))
app.use("/refresh", require("./routes/refreshRoute"))
app.use("/logout", require("./routes/logoutRoute")) */
app.use("/createUser", require("./routes/mongo/createUser"))
app.use("/incrementStytchUser", require("./routes/mongo/incrementStytchUser"))
app.use(verifyJWT)

app.use("/test", (req,res) => {
  return res.send({message : "Hello"})
})

app.use("/getIsUserExisting", require("./routes/mongo/getIsUserExisting")),

app.use("/deleteUserShowDetails", require("./routes/mongo/deleteShowDetails"))
app.use("/postUpdateUserShowDetails", require("./routes/mongo/updateUserShowDetails"))
app.use("/getUserShowDetails", require("./routes/mongo/userShowDetails"))




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));