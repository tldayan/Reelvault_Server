const whitelist = ["https://reelvault-final.vercel.app"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin) || origin === '*') {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
