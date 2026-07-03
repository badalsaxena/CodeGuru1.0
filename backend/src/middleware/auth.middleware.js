const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log("========== HEADERS ==========");
  console.log(req.headers);

  try {
    // Get Authorization Header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token Format",
      });
    }

    // Extract Token
    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    req.user = decoded;

    next();

  } catch (error) {
    console.log("JWT ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};

module.exports = verifyToken;