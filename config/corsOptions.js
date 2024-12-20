const whitelist = ["https://reelvault.vercel.app"];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  maxAge: 28800 // preflight cache (8 hours)
};


/* const corsOptions = {
  origin: true,  // Allow all origins
  credentials: true,
  optionsSuccessStatus: 200,
}; */

module.exports = corsOptions;

