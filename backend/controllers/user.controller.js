const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            message: 'Email already registered',
        });
    }

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashPassword });

        // Generate JWT Token
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '24h' });

        // Set token in cookies
        res.cookie('token', token);

        return res.status(201).json({
            message: 'User created successfully',
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error while Signup',
        });
    }
};

const signin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: 'Invalid Credentials',
        });
    }

    try {
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: 'Invalid Credentials',
            });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '24h' });

        // Set token in cookies
        res.cookie('token', token);

        return res.status(200).json({
            message: 'User signed in successfully',
            username: user.username,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error While Signin',
        });
    }
};

const logout = async (req, res) => {
    try {
  
      res.clearCookie('token');
  
      return res.status(200).json({ message: 'You have successfully logged out.' });
    } catch (error) {
      console.log("Error during logout:", error);
      return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};  

module.exports = {
    signup,
    signin,
    logout
};