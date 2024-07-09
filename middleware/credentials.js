

const whitelist = ["https://reelvaultapp.vercel.app"]

const credentials = (req,res,next) => {

    const origin  = req.headers.origin

    if(whitelist.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        next()
    } else {
        res.status(403).send("Forbidden")
    }

    

}

module.exports = credentials