const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    taskDate: {
        type: String,
        required: true
    },
    taskStatus: {
        type: String,
        default: 'Incomplete',
        required: true
    },
    taskLike:{
        type: Boolean,
        default: false,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // Reference to the User model
    }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
