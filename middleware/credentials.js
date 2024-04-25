

const whitelist = ["https://reelvault.vercel.app","*"]

const credentials = (req,res,next) => {

    const origin  = req.headers.origin

    if(origin !== whitelist[0] || origin !== whitelist[1]) {
        res.header("Access-Control-Allow-Credentials", true);
        next()
    } else {
        return
    }

    

}

module.exports = credentials