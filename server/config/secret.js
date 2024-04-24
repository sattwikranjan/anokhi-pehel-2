const jwt = require("jsonwebtoken");
const JWT_KEY = "HaHa";

const generateToken = (userId) => {
  return jwt.sign({ user: { id: userId } }, JWT_KEY);
};

const verifyToken = (token) => {
    return jwt.verify(token, JWT_KEY);
}

module.exports = {generateToken, verifyToken};
