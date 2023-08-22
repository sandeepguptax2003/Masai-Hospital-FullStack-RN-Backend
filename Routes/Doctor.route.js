const express = require("express");
const { Doctor } = require("../Models/Doctor.model");

const doctorRouter = express.Router();

doctorRouter.get("/doctors", async (req, res) => {
  const doctors = await Doctor.find();
  res.send(doctors);
});

doctorRouter.post("/doctors", async (req, res) => {
  const { name, imageUrl, specialization, experience, location, slots, fee } =
    req.body;

  try {
    const doctor = new Doctor({
      name,
      imageUrl,
      specialization,
      experience,
      location,
      slots,
      fee,
    });

    await doctor.save();

    res.status(201).json({ message: "Doctor onboarded successfully" });
  } catch (error) {
    console.error("Failed to onboard doctor", error);
    res.status(500).json({ error: "Failed to onboard doctor" });
  }
});

doctorRouter.put("/doctors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDoctor = req.body;
    await Doctor.findByIdAndUpdate(id, updatedDoctor);
    res.json({ message: "Doctor details updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to update doctor details" });
  }
});

doctorRouter.delete("/doctors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Doctor.findByIdAndRemove(id);
    res.json({ message: "Doctor details deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to delete doctor details" });
  }
});

module.exports = {
  doctorRouter,
};
