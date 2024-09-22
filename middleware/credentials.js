const whitelist = ["https://reelvault.vercel.app"];

const credentials = (req, res, next) => {
  const origin = req.headers.origin;

  if (whitelist.includes(origin)) {

    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");


    if (req.method === "OPTIONS") {
      return res.sendStatus(200);  
    }
    
    next(); 
  } else {
    res.status(403).send("Forbidden: CORS policy does not allow this origin.");
  }
};

module.exports = credentials;
