const authorizationSeller = (req, res, next) => {
  // check if the authenticated user is seller
  if (req.seller && req.seller.role === "seller") {
    // seler is authorized
    next();
  } else {
    // seller is not authorized
    res.status(403).json({ error: "Forbidden : Insufficient Permission" });
  }
};

module.exports = authorizationSeller;
