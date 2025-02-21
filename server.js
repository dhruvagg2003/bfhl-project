require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// User details (Static for now)
const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

// GET request - Returns operation_code
app.get("/bfhl", (req, res) => {
    return res.status(200).json({ operation_code: 1 });
});




// POST request - Process input data
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;
        
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid request format" });
        }

        let numbers = [];
        let alphabets = [];

        // Separate numbers and alphabets
        data.forEach(item => {
            if (!isNaN(item)) numbers.push(item);
            else if (/^[a-zA-Z]$/.test(item)) alphabets.push(item);
        });

        // Find the highest alphabet (last in A-Z order)
        let highestAlphabet = [];
        if (alphabets.length > 0) {
            highestAlphabet = [alphabets.sort((a, b) => b.localeCompare(a, 'en', { sensitivity: 'base' }))[0]];
        }

        // Response structure
        return res.status(200).json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        });
    } catch (error) {
        return res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
});


app.get("/", (req, res) => {
    res.send("Welcome to the BFHL API!");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


