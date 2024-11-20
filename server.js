const express = require("express");
const cors = require("cors");
const credentials = require("./middleware/credentials");
const connectDB = require("./mongo/MongoDB");
const corsOptions = require("./config/corsOptions");
const cookieParser = require('cookie-parser');

const { ApolloServer } = require('apollo-server-express');

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const app = express();
const PORT = process.env.PORT || 3200;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// CORS setup
app.use(credentials);
app.use(cors(corsOptions));


app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/favicon.png', (req, res) => res.status(204).end());

// Database connection
connectDB();

// Route handlers
app.use("/createUser", require("./routes/mongo/createUser"));
app.use("/incrementStytchUser", require("./routes/mongo/incrementStytchUser"));
app.use("/getIsUserExisting", require("./routes/mongo/getIsUserExisting"));
app.use("/deleteUserShowDetails", require("./routes/mongo/deleteShowDetails"));
app.use("/postUpdateUserShowDetails", require("./routes/mongo/updateUserShowDetails"));
app.use("/getUserShowDetails", require("./routes/mongo/userShowDetails"));
app.use("/getUserWatchlist", require("./routes/mongo/getUserWatchlist"))
app.use("/deleteUserWatchlist", require("./routes/mongo/deleteUserWatchlist"))
app.use("/addUserWatchlist", require("./routes/mongo/addUserWatchlist"))
app.use("/askGemini", require("./routes/askGemini"))

// Test route
app.use("/test", (req, res) => res.send({ message: "Hello" }));

// Apollo Server
async function startApolloServer() {
    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: "/graphql" });
}

async function startServer() {
    try {
        await startApolloServer();
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();

