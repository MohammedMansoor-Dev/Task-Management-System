const User = require('../models/user.model');
const Task = require('../models/task.model');
const nodemailer = require('nodemailer');

const taskStatus = async (req, res) => {
    try {
        // Populate the 'user' field in tasks to get the user details (including username)
        const allTasks = await Task.find({}); 
        
        // Fetch all users without password field
        const allUsers = await User.find({}).select('-password'); 
        
        res.status(200).send({ allTasks, allUsers }); 
    } catch (error) {
        console.error('Error fetching tasks:', error); 
        res.status(500).send('Server error'); 
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;  // Extract userId from URL parameters
        const user = await User.findByIdAndDelete(userId);  // Correct way to delete user
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({ message: "User deleted successfully", user });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send({ message: "Server error" });
    }
};

const sendSettingsEmail = async (req, res) => {
    const { username, email, notifications } = req.body;

    try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_MAIL, // Replace with your admin email
                pass: process.env.USER_MAIL_PASSWORD // Replace with your email password
            }
        });

        // Email content
        const mailOptions = {
            from: email,
            to: process.env.USER_MAIL, // Admin email address
            subject: 'User Settings Update',
            text: `Username: ${username}\nEmail: ${email}\nNotifications: ${notifications ? 'Enabled' : 'Disabled'}`
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Settings emailed successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Error sending email' });
    }
};

module.exports = {
    taskStatus,
    deleteUser,
    sendSettingsEmail
};