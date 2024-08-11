const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Register Function
const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ firstName, lastName, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ email: user.email }, 'secretKey', { expiresIn: '1h' });

        // Send confirmation email
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'adbalhameed5@gmail.com',
        //         pass: '12124781212478@'
        //     }
        // });

        // const mailOptions = {
        //     from: 'adbalhameed5@gmail.com',
        //     to: user.email,
        //     subject: 'Email Confirmation',
        //     html: `<h1>Email Confirmation</h1>
        //            <p>Please confirm your email by clicking the link below:</p>
        //            <a href="http://localhost:3001/api/users/confirm/${token}">Confirm Email</a>`
        // };

        // transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         console.error('Error sending email: ', error);
        //         return res.status(500).json({ message: 'Error sending confirmation email' });
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //         res.status(201).json({ message: 'User registered successfully! Please check your email to confirm your account.' });
        //     }
        // });
    } catch (error) {
        console.error('Error during registration: ', error);
        res.status(500).json({ message: `Something went wrong: ${error.message}` });
    }
};

// Login Function
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email: user.email, id: user._id }, 'secretKey', { expiresIn: '1h' });
        res.status(200).json({ result: user, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Email Confirmation Function
/*
const confirmEmail = async (req, res) => {
    const { token } = req.params;
    try {
        const decoded = jwt.verify(token, 'secretKey');
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.confirmed = true;
        await user.save();
        res.status(200).json({ message: 'Email confirmed successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};
*/
// Get User Profile Function
const getUserProfile = async (req, res) => {
    try {
        const user = req.user; // Assuming you have set req.user in your middleware
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { register, login//, confirmEmail
    , getUserProfile };
