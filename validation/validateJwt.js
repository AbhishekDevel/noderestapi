const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
  const token = req.header("auth-token");
  if(!token) return res.status(401).send("Access Denied");

  try{
    const verified = jwt.verify(token, process.env["JWTKEY"])
    req.user = verified
    next();
  }catch{
    res.stauts(400).send("Invalid Token")
  }
};