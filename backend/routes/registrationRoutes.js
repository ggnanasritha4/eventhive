import express from "express";
import Registration from "../models/Registration.js";

const router = express.Router();


// ===============================
// USER: Register for an Event
// POST /api/registrations
// ===============================
router.post("/", async (req, res) => {
    try {
        const {
            eventId,
            name,
            rollNo,
            email,
            phone,
            branch,
            year
        } = req.body;


        // Check duplicate registration
        // Same student cannot register twice for same event
        const existingRegistration = await Registration.findOne({
            eventId: eventId,
            $or: [
                { rollNo: rollNo },
                { email: email }
            ]
        });


        if (existingRegistration) {
            return res.status(400).json({
                message: "You have already registered for this event"
            });
        }


        const registration = new Registration({
            eventId,
            name,
            rollNo,
            email,
            phone,
            branch,
            year
        });


        const savedRegistration = await registration.save();


        res.status(201).json({
            message: "Registration successful",
            registration: savedRegistration
        });


    } catch (error) {

        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });

    }
});



// ===============================
// USER: View My Registrations
// GET /api/registrations/user/:email
// ===============================
router.get("/user/:email", async (req, res) => {
    try {
        const registrations = await Registration.find({
            email: req.params.email
        }).populate("eventId");


        res.json(registrations);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch registrations",
            error: error.message
        });

    }
});



// ===============================
// ADMIN: Get All Registrations
// GET /api/registrations
// ===============================
router.get("/", async (req, res) => {
    try {

        const registrations = await Registration.find()
            .populate("eventId");


        res.json(registrations);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch registrations",
            error: error.message
        });

    }
});



// ===============================
// ADMIN: Get Registrations By Event
// GET /api/registrations/event/:eventId
// ===============================
router.get("/event/:eventId", async (req, res) => {
    try {

        const registrations = await Registration.find({
            eventId: req.params.eventId
        }).populate("eventId");


        res.json(registrations);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch event registrations",
            error: error.message
        });

    }
});



// ===============================
// ADMIN: Delete Registration
// DELETE /api/registrations/:id
// ===============================
router.delete("/:id", async (req, res) => {
    try {

        const deletedRegistration =
            await Registration.findByIdAndDelete(req.params.id);


        if (!deletedRegistration) {
            return res.status(404).json({
                message: "Registration not found"
            });
        }


        res.json({
            message: "Registration deleted successfully"
        });


    } catch (error) {

        res.status(500).json({
            message: "Delete failed",
            error: error.message
        });

    }
});


export default router;