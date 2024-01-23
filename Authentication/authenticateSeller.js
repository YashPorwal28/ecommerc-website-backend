const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
require("dotenv").config();

const authenticateSeller = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ error: "Unauthorized or missing token" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.seller = decoded.role;
    console.log(req.seller);
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized : Invaldi tokne" });
  }
};

module.exports = authenticateSeller;
