const express = require("express");
const Admission = require("../models/Admission");
const router = express.Router();
const cors = require("cors");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const app = express();

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

router.route("/addStudentAdmission").post(upload.single("photo"), async (req, res) => {
  const name = req.body.name;
  const mentorId=req.body.mentorId;
  const className = req.body.class;
  const inAnokhiPehel = req.body.inAnokhiPehel;
  const phone = req.body.phone;
  const location = req.body.location;
  const dob = req.body.dob;
  const aadhar = req.body.aadhar;
  const address = req.body.address;
  const discription = req.body.discription;
  const school = req.body.school;
  const photo = req.file.filename;
  try {
    const existingStudentAdmission = await Admission.findOne({ aadhar: aadhar });
    if (existingStudentAdmission) {
      return res.json("Student with this Aadhar number already exists");
    }
    const newStudentAdmissionData = {
      name,
      mentorId,
      className,
      inAnokhiPehel,
      phone,
      location,
      dob,
      aadhar,
      address,
      discription,
      school,
      photo,
    };

    const newStudentAdmission = new Admission(newStudentAdmissionData);

    await newStudentAdmission.save();
    res.json("Student Admission Added");
  } catch (error) {
    // console.error(error);
    res.json("ALL INPUT IS NOT FILLED");
  }
});

router.get("/admittedStudentList", async (req, res) => {
    try {
      const students = await Admission.find();
      res.json(students);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  
  router.get("/getAdmittedStudentByUserId", async (req, res) => {
    // Extract the user ID from the request query parameters
    const student_id = req.query.studentid;
  
    try {
      // Query the database to retrieve the user based on the ID
      const student = await Admission.findById(student_id);
      // Check if the user exists
      if (!student) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json(student);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  
  router.delete("/deleteAdmittedStudents/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the student by ID and delete it
      const deletedStudent = await Admission.findOneAndDelete({ _id: id });
  
      if (deletedStudent) {
        // If the student was found and deleted, send a success message
        res
          .status(200)
          .json({ message: "Student deleted successfully", deletedStudent });
      } else {
        // If no student was found with the provided ID, send a 404 error
        res.status(404).json({ error: "Student not found" });
      }
    } catch (error) {
      // If an error occurs during the deletion process, send a 500 error
      res.status(500).json({ error: "Internal server error" });
    }
  });


module.exports = router;
