const express = require("express");
const Event = require("../models/Event"); // Assuming the Event schema is located in models/Event.js
const router = express.Router();
const cors = require("cors");

// Middleware setup
const app = express();
app.use(cors());
app.use(express.json()); // To parse incoming JSON data

// Route to add a new event
router.post("/addEvent", async (req, res) => {
//   const { eventName, eventDepartment, location, startTime,endTime, coordinator, phone, regNumber, festName } = req.body;
  try {
    // Create a new event object
    // const newEvent = new Event({
    //   eventName,
    //   eventDepartment,
    //   location,
    //   startTime,
    //   endTime,
    //   coordinator,
    //   phone,
    //   regNumber,
    //   festName
    // });
    const newEvent = new Event({...req.body});
     await newEvent.save();
    res.status(201).json({ success: true, message: "Event added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error. Event could not be added." });
  }
});

router.get("/getEvents", async (req, res) => {
    try {
      const events = await Event.find(); // Fetch all events from the database
      res.json(events); // Send the events as a JSON response
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events." }); // Send error response
    }
  });

  // Route to get an event by its ID
router.get("/getEventByEventId", async (req, res) => {
    const { eventId } = req.query; // Get eventId from query parameters
  
    try {
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.status(200).json(event);
    } catch (error) {
      console.error("Error fetching event by ID: ", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  router.delete("/deleteEvent/:eventId", async (req, res) => {
    const { eventId } = req.params; // Get eventId from request parameters
  
    try {
      // Check if the event exists
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      // Delete the event
      await Event.findByIdAndDelete(eventId);
      
      return res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      console.error("Error deleting event:", error);
      return res.status(500).json({ message: "Server error, could not delete event" });
    }
  });



  router.post("/editEvent", async (req, res) => {
    const {
      eventId,
      eventName,
      eventDepartment,
      location,
      startTime,
      endTime,
      coordinator,
      phone,
      regNumber,
      festName,
      firstPlace,
      secondPlace,
      thirdPlace,
      fourthPlace,
    } = req.body;
  

    try {
      // Find the event by eventId and update it
      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        {
          eventName,
          eventDepartment,
          location,
          startTime,
          endTime,
          coordinator,
          phone,
          regNumber,
          festName,
          firstPlace,
          secondPlace,
          thirdPlace,
          fourthPlace,
        },
        { new: true } // This option returns the updated document
      );
  
      if (!updatedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      res.status(201).json({ message: "Event updated successfully", updatedEvent });
    } catch (error) {
      console.error("Error updating event:", error);
      res.status(500).json({ message: "Server error" });
    }
  });



module.exports = router;
