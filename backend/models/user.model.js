const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],  // Ensures only 'user' or 'admin' can be set
        default: 'user'           // Default to 'user' if not provided
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
