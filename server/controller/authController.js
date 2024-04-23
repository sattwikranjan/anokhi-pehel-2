const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken, verifyToken } = require("../config/secret");

const login = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success, error: "Try Logging in with correct credentials" });
    }

    const pwdCompare = await bcrypt.compare(password, user.password);
    if (!pwdCompare) {
      return res
        .status(400)
        .json({ success, error: "Try Logging in with correct credentials" });
    }

    success = true;
    const authToken = generateToken(user.id);
    res.json({ success, authToken });
  } catch (error) {
    console.error(error.message);
    res.send("Server Error");
  }
};

const getUserData = async (req, res) => {
    // Get the token from the request header
    const token = req.headers.authorization; 
    // Verify and decode the token (use your own verification logic)
    if (token) {
      try {
        const decoded = verifyToken(token)
  
        // Extract user ID from the decoded token
        const userId = decoded.user.id
  
        // Fetch user data from the database using the user ID
        const user = await User.findById(userId);
  
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        user.password = undefined;
  
        // Return user data as JSON
        res.json({ success: true, data: user });
      } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }
    } else {
      return res.status(401).json({ message: "Token not provided" });
    }
  }

module.exports = { login, getUserData };
