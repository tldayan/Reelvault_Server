
const whitelist = ["https://reelvault.vercel.app","*"]

    const corsOptions = {
        origin: (origin,callback) => {
            if(whitelist.includes(origin)/*  || !origin */) { // "!origin" must be removed during Production
                callback(null, true)
            } else {
                callback(new Error("Not allowed by Cors"))
            }
        },
        credentials : true,
        optionsSuccessStatus: 200
    }

module.exports = corsOptions