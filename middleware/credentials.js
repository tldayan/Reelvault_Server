

const whitelist = ["https://reelvault-final.vercel.app"]

const credentials = (req,res,next) => {

    const origin  = req.headers.origin

    if(whitelist.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", true);
        next()
    } else {
        res.status(403).send("Forbidden")
    }

    

}

module.exports = credentials