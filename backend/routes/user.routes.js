const express = require('express');
const { signup, signin, logout } = require('../controllers/user.controller'); // Destructure both functions

const router = express.Router();

router.post('/signup', signup); // Use signup
router.post('/signin', signin); // Use signin
router.get('/logout', logout)

module.exports = router;
