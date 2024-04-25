

const whitelist = ["https://reelvault.vercel.app","http://localhost:5173"]

const credentials = (req,res,next) => {

    const origin  = req.headers.origin

    if(whitelist.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", true);
        next()
    } else {
        return
    }

    

}

module.exports = credentials