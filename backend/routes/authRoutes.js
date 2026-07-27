import express from "express";
import User from "../models/User.js";

const router = express.Router();


// Signup
router.post("/signup", async (req, res) => {

    try {

        const { name, email, password } = req.body;


        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }


        const user = new User({
            name,
            email,
            password
        });


        await user.save();


        res.status(201).json({
            message: "Signup successful",
            user
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});



// Login
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;


        const user = await User.findOne({ email });


        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        if (user.password !== password) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }


        res.status(200).json({
            message: "Login successful",
            user
        });


    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }

});


export default router;