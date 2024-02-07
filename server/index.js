const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const path = require("path");
dotenv.config();
const PORT = process.env.PORT;
const mongoDB = require("./config/db");
const authMiddleware = require("./middlewares/authMiddleware");
const { authController } = require("./controller/userCOntroller");
mongoDB();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://anokhi-pehel.azurewebsites.net"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE" // Include DELETE here
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());
app.use("/images", express.static("images"));
app.use("/api/v1/user", require("./routers/login"));
app.use("/api/v1/user", require("./routers/student"));
app.use("/api/v1/user", require("./routers/AddUser"));
app.use("/api/v1/user", require("./routers/AddScore"));
app.use("/api/v1/user", require("./routers/LineSchedule"));
app.use("/api/v1/user", require("./routers/ClassSchedule"));
app.use("/api/v1/user", require("./routers/Attendance"));
app.use("/api/v1/user", require("./routers/Topic"));
app.post("/api/v1/user/getUserData", authMiddleware, authController);

// Serve your static files from the Vite build
app.use(express.static(path.join(__dirname, "../client")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`.bgCyan.white);
});
