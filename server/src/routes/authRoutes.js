const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User'); // user schema
const router = express.Router();
const { encryptionKey } = require('../keys');

// routes
const SIGNUP = '/signup';
// sign in route
const SIGNIN = '/signin';

router.post(SIGNUP, async (req, res) => {
    // extracting the email and password from the body
    const { email, password } = req.body;

    try {
        // Check if email is already in the database
        const existingUser = await User.findOne({ email });

        // check if user already exist
        if (existingUser) {
            return res.status(422).send({ error: 'Email already exists' });
        }

        // Create a new user in the database
        const newUser = new User({ email, password });
        await newUser.save();

        // Create a token with the MongoDB user ID
        const token = jwt.sign({ userId: newUser._id }, encryptionKey);

        // Send the token in the response
        res.send({ token });
    } catch (error) {
        // Handle user errors
        return res.status(422).send(error.message);
    }
});

router.post(SIGNIN, async (req, res) => {
    const { email, password } = req.body;
    // Check if email and password are provided
    if (!email || !password) {
        return res
            .status(422)
            .send({ error: 'Must provide email and password' });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // If user not found, return error
    if (!user) {
        return res.status(404).send({ error: 'Email not found' });
    }

    try {
        // Compare user's password with the provided password
        await user.comparePassword(password);

        // Generate a token for the user
        const token = jwt.sign({ userId: user._id }, encryptionKey);

        // Send the token in the response
        res.send({
            token,
        });
    } catch (error) {
        // If password comparison fails, return error
        return res.status(422).send({ error: 'Invalid Password or Email' });
    }
});

module.exports = router;
