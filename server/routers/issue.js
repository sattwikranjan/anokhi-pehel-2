const express = require("express");
const Issue = require("../models/Issue"); // Assuming the model is in the models folder

const router = express.Router();

// Issue creation route
router.post('/issues', async (req, res) => {
  const { userId, userName, userRegNumber, issue } = req.body;
console.log(req.body);
  try {
    // Create a new issue document
    const newIssue = new Issue({
      userId,
      userName,
      userRegNumber,
      issue,
    });

    // Save the issue to the database
    const savedIssue = await newIssue.save();

    res.status(201).json({
      message: 'Issue submitted successfully!',
      issue: savedIssue,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error submitting the issue',
      error: error.message,
    });
  }
});

router.get("/fetchIssues", async (req, res) => {
    try {
        const issues = await Issue.find(); // Retrieve all issues from the database
        res.status(200).json(issues); // Send issues as a JSON response
    } catch (error) {
        res.status(500).json({
            message: "Error fetching issues",
            error: error.message,
        });
    }
});

module.exports = router;
