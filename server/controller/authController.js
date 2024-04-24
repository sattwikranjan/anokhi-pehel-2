const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwtSecret = "HaHa";
const generator = require("generate-password");
const jwt = require("jsonwebtoken");
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
      const decoded = verifyToken(token);

      // Extract user ID from the decoded token
      const userId = decoded.user.id;

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
};

var transporter = nodemailer.createTransport({
  //service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: `${process.env.email}`,
    pass: `${process.env.password}`,
  },
});

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(200).send({
        message: "Invaild email id",
        success: false,
      });
    }
    const secret = jwtSecret + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "30m",
    });
    const link = `https://anokhi-pehel.azurewebsites.net/api/v1/user/reset-password/${oldUser._id}/${token}`;

    var mailOptions = {
      from: `Anokhi Pehel <${process.env.email}>`,
      to: `${email}`,
      subject: "Change your login password",
      text: `Dear User,

      You have requested to reset your password. Please follow the link below to reset your password:
      
      ${link}
      
      If you did not request this, please ignore this email.
      
      Regards,
      Web Team,
      Anokhi Pehel`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        //console.log(link);
        return res.status(200).send(link);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.status(200).send({
      message: "Invaild email id",
      success: false,
    });
  }
  const secret = jwtSecret + oldUser.password;
  const password = generator.generate({
    length: 10,
    numbers: true,
  });
  //console.log(password);
  try {
    const verify = jwt.verify(token, secret);
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
    var mailOptions = {
      from: `Anokhi Pehel <${process.env.email}>`,
      to: `${oldUser.email}`,
      subject: "Updated Password",
      text: `Dear User,
  
        You have requested to reset your password. This is your new password:
        
        ${password}
        
        Use it to login to Anokhi Pehel webiste and change this password after successful login.
        
        Regards,
        Web Team,
        Anokhi Pehel`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(password);
        return res
          .status(200)
          .send(
            "New password has been sent to mail.Please Check spam section as well if not received."
          );
      }
    });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};
module.exports = { login, getUserData, forgotPassword, resetPassword };
