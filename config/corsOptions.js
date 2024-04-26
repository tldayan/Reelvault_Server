const whitelist = ["https://reelvault.vercel.app"];

function isFaviconRequest(req) {
  return req.originalUrl && req.originalUrl.endsWith('/favicon.ico');
}

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || isFaviconRequest(req)) {
      // Allow requests with no origin (e.g., favicon requests) or from whitelisted origins
      callback(null, true);
    } else {
      callback(new Error("Not allowed by Cors"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
