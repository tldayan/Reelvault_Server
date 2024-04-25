

const whitelist = ["https://reelvault.vercel.app","http://localhost:5173"]

const credentials = (req,res,next) => {

    const origin  = req.headers.origin
    console.log("reached creds")
    if(whitelist.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", true);
        next()
    } else {
        res.status(403).send("Forbidden")
    }

    

}

module.exports = credentials