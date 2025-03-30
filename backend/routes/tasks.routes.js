const express = require('express')
const { createTasks, getAllTasks, editTask, toggleFavorite, toggleTaskStatus, deleteTask, getAllLikeTasks, getAllCompletedTasks, getAllIncompleteTasks } = require('../controllers/tasks.controller')
const authenticate = require('../middlewares/authenticate')
const router = express.Router()

router.post('/create-task', authenticate, createTasks)
router.get('/all-tasks', authenticate, getAllTasks)
router.get('/delete-task/:taskId', authenticate, deleteTask)
router.put('/edit-task/:taskId', authenticate, editTask)
router.patch('/toggle-taskLike/:taskId', authenticate, toggleFavorite);  // Route for toggling favorite status
router.patch('/toggle-taskStatus/:taskId', authenticate, toggleTaskStatus);  // Route for toggling Task status
router.get('/important-tasks', authenticate, getAllLikeTasks)
router.get('/completed-tasks', authenticate, getAllCompletedTasks)
router.get('/inComplete-tasks', authenticate, getAllIncompleteTasks)

module.exports = router