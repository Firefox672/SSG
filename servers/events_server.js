const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { exec } = require("child_process");


const app = express();
app.use(express.json());
app.use(cors());

// Replace with your MongoDB Atlas connection string
const mongoURI = "mongodb+srv://firefox672:5MEXKmbmLE5ExXeI@cluster0.37waq.mongodb.net/testing";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// API to Start Server Automatically
app.get("/start-server", (req, res) => {
  console.log("Server is already running.");
  res.status(200).send("Server is running.");
});

// Define schema and model
const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  place: String,
  theme: String,
  info: String,
});

const Event = mongoose.model("Event", eventSchema);

// API endpoint to handle event submissions
app.post("/submit-event", async (req, res) => {
  try {
    const { title, date, time, place, theme, info } = req.body;

    // Check if the event already exists (same title & date)
    const existingEvent = await Event.findOne({ title, date });
    if (existingEvent) {
      return res.status(409).json({ error: "Duplicate event. This event is already scheduled on this date." });
    }

    // Save to database
    const newEvent = new Event({ title, date, time, place, theme, info });
    await newEvent.save();

    res.status(201).json({ message: "Event saved successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to save event" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
