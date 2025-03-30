const Task = require('../models/task.model');
const User = require('../models/user.model');

const createTasks = async (req, res) => {
    const { title, description, taskDate, taskStatus, taskLike } = req.body;
    const userId = req.userId;

    try {
        // Check if a task with the same title already exists for this user
        const existingTask = await Task.findOne({ title, user: userId });
        if (existingTask) {
            return res.status(400).json({ message: 'A task with this title already exists.' });
        }

        // Create a new task with the userId field populated
        const newTask = await Task.create({
            title,
            description,
            taskDate,
            taskStatus,
            taskLike,
            user: userId // Associate the task with the user
        });

        // Return the newly created task to the client
        return res.status(201).json({message: 'Task Added Successfully', newTask}); // 201 status code for creation
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getAllTasks = async (req, res) => {
    const userId = req.userId;
    const userRole = req.role;  // Get the user's role from the request

    try {
        if (userRole === 'admin') {
            // If user is an admin, fetch all tasks for all users
            const allTasks = await Task.find().populate('user', 'name');  // Optional: populate user info if you need it
            return res.status(200).json(allTasks);
        } else if (userRole === 'user') {
            // If user is a regular user, fetch only their tasks
            const allTasks = await Task.find({ user: userId });
            return res.status(200).json(allTasks);
        } else {
            return res.status(403).json({ message: 'Access Denied' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const editTask = async (req, res) => {
    const { taskId } = req.params;  // Get taskId from the URL params
    const { title, description, taskDate } = req.body;  // Get updated data from the request body
    const userId = req.userId;  // Get the current logged-in user's ID
    const userRole = req.role;  // Get the current logged-in user's role (user or admin)

    try {
        // Find the task by ID
        const task = await Task.findById(taskId);

        // Check if the task exists
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if the user is allowed to update the task
        if (task.user.toString() !== userId && userRole !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to edit this task' });
        }

        // Update the task with the new data
        task.title = title || task.title;  // Update title if provided, else keep the current one
        task.description = description || task.description;  // Same for description
        task.taskDate = taskDate || task.taskDate;  // Same for TaskDate

        // Save the updated task
        const updatedTask = await task.save();

        // Return the updated task
        return res.status(200).json({message: 'Task Updated Successfully', updatedTask});

    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const toggleFavorite = async (req, res) => {
    const { taskId } = req.params;  // Get the task ID from the URL
    const userId = req.userId;  // Get the logged-in user's ID

    try {
        // Find the task by ID
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Ensure that the task belongs to the logged-in user (optional, but good for security)
        if (task.user.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to favorite this task' });
        }

        // Toggle the favorite status
        task.taskLike = !task.taskLike;  // If true, it becomes false, and vice versa

        // Save the updated task
        const updatedTask = await task.save();

        // Return the updated task
        return res.status(200).json({message: `Task Marked as ${task.taskLike == true? 'Important': 'Unimportant'}`, updatedTask});
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const toggleTaskStatus = async (req, res) => {
    const { taskId } = req.params;  // Get the task ID from the URL
    const userId = req.userId;  // Get the logged-in user's ID

    try {
        // Find the task by ID
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Ensure that the task belongs to the logged-in user (optional, but good for security)
        if (task.user.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to favorite this task' });
        }

        // Toggle the task status
        task.taskStatus = task.taskStatus === 'Incomplete' ? 'Completed' : 'Incomplete';

        // Save the updated task
        const updatedTask = await task.save();

        // Return the updated task
        return res.status(200).json({message: `Marked as ${updatedTask.taskStatus}`, updatedTask});
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const deleteTask = async (req, res) => {
    const { taskId } = req.params;  // Get the task ID from the URL
    const userId = req.userId;  // Get the logged-in user's ID
    const userRole = req.role

    try {
        // Find the task by ID
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Ensure that the task belongs to the logged-in user (optional, but good for security)
        if (task.user.toString() !== userId && userRole !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to delete this task' });
        }

        // Delete the task
        const deletedTask = await Task.findByIdAndDelete(taskId);

        // Return success response
        return res.status(200).json({ message: 'Task successfully deleted', deletedTask });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getAllLikeTasks = async (req, res) => {
    const userId = req.userId;
    const userRole = req.role;  // Get the user's role from the request

    try {
        if (userRole === 'admin') {
            // If user is an admin, fetch all tasks for all users where taskLike is true
            const allTasks = await Task.find({ taskLike: true }).populate('user', 'name');  // Optional: populate user info if you need it
            return res.status(200).json(allTasks);
        } else if (userRole === 'user') {
            // If user is a regular user, fetch only their tasks where taskLike is true
            const allTasks = await Task.find({ user: userId, taskLike: true });
            return res.status(200).json(allTasks);
        } else {
            return res.status(403).json({ message: 'Access Denied' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getAllCompletedTasks = async (req, res) => {
    const userId = req.userId;
    const userRole = req.role;  // Get the user's role from the request

    try {
        if (userRole === 'admin') {
            // If user is an admin, fetch all tasks for all users where taskStatus is Completed
            const allTasks = await Task.find({ taskStatus: 'Completed' }).populate('user', 'name');  // Optional: populate user info if you need it
            return res.status(200).json(allTasks);
        } else if (userRole === 'user') {
            // If user is a regular user, fetch only their tasks where taskStatus is Completed
            const allTasks = await Task.find({ user: userId, taskStatus: 'Completed' });
            return res.status(200).json(allTasks);
        } else {
            return res.status(403).json({ message: 'Access Denied' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getAllIncompleteTasks = async (req, res) => {
    const userId = req.userId;
    const userRole = req.role;  // Get the user's role from the request

    try {
        if (userRole === 'admin') {
            // If user is an admin, fetch all tasks for all users where taskStatus is Incomplete
            const allTasks = await Task.find({ taskStatus: 'Incomplete' }).populate('user', 'name');  // Optional: populate user info if you need it
            return res.status(200).json(allTasks);
        } else if (userRole === 'user') {
            // If user is a regular user, fetch only their tasks where taskStatus is Incomplete
            const allTasks = await Task.find({ user: userId, taskStatus: 'Incomplete' });
            return res.status(200).json(allTasks);
        } else {
            return res.status(403).json({ message: 'Access Denied' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createTasks,
    getAllTasks,
    editTask,
    toggleFavorite,
    toggleTaskStatus,
    deleteTask,
    getAllLikeTasks,
    getAllCompletedTasks,
    getAllIncompleteTasks
}