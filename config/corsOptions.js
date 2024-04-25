

const whitelist = ["https://reelvault.vercel.app","http://localhost:5173"]

    const corsOptions = {
        origin: (origin,callback) => {
            if(whitelist.includes(origin)/*  || !origin */) { // "!origin" must be removed during Production
                callback(null, true)
            } else {
                callback(new Error("Not allowed by Cors"))
            }
        },
        optionsSuccessStatus: 200
    }

module.exports = corsOptions