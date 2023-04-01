const jwt = require("jsonwebtoken");
const JWT_SECRET = "AbhishekIsGoodB$oi";

const fetchUser = (req, res, next) => {
  //get user from jwt token and add id to res onject
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ error: "Please authenticate using valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);

    req.user = data.user.id;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Please authenticate using valid token" });
  }
};

module.exports = fetchUser;
