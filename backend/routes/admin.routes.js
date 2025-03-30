const express = require('express')
const authenticate = require('../middlewares/authenticate')
const { taskStatus, deleteUser, sendSettingsEmail } = require('../controllers/admin.controller')

const router = express.Router()

router.get('/', authenticate, taskStatus)
router.delete('/delete-user/:userId', authenticate, deleteUser);
router.post('/send-settings',  sendSettingsEmail);

module.exports = router