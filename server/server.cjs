const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();
const User = require('./models/User.cjs');
const protect = require('./middlewares/authMiddleware.cjs'); // Import the middleware

const app = express();
app.use(express.json());
app.use(cors({origin: 'http://localhost:5174'}));
const PORT = process.env.PORT || 5000;

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, 'askdhasjkdhnbvcsnmgasdfkhja', {
        expiresIn: "1h"
    });
};

mongoose.connect('mongodb+srv://anton:loldaniggwp2@backenddb.ibkn8.mongodb.net/playgreat?retryWrites=true&w=majority&appName=BackendDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

  app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate and return the token
        res.json({
            token: generateToken(user._id),
            user: { id: user._id, email: user.email }
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.get('/api/profile', protect, (req, res) => {
    res.json({ message: "Welcome to your profile!", user: req.user });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
