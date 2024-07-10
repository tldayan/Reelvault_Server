const whitelist = ["https://reelvault.vercel.app"];

const corsOptions = {
  origin: (origin, callback) => {
    if (/* !origin ||  */whitelist.includes(origin)/*  || origin === '*' */) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};


/* const corsOptions = {
  origin: true,  // Allow all origins
  credentials: true,
  optionsSuccessStatus: 200,
}; */

module.exports = corsOptions;

