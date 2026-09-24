require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const dns = require("dns");
const Event = require("./models/Events");
app.use(cors());
app.use(express.json());
dns.setServers(['8.8.8.8']);

mongoose.connect(process.env.MONGODB_URI)
 .then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

app.get("/", (req, res) => {
  res.send("Backend is working");
})

app.get("/api/events", async (req, res) => {
   const events = await Event.find();
   res.json(events);
})
app.delete("/api/events/:eventId", async (req, res) => {
   const deletedEvent = await Event.findByIdAndDelete(req.params.eventId);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({
      message: "Event Deleted Successfully",
    });
});

app.post("/api/events", async (req, res) => {
    const newEvent = await Event.create(req.body);
    res.json({
      message: "Event added successfully",
      event: newEvent,
    });
});
app.put("/api/events/:eventId", async (req, res) => {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.eventId,
      req.body,
      { returnDocument: "after" }
    )

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({
      message: "Event updated successfully",
      event: updatedEvent
    });
  });


app.listen(5000, () => {
    console.log("Server is running on port 5000");
})
