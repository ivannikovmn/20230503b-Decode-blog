const express = require('express')
const router = express.Router();
const {saveToWatch , editUser , deleteUser } = require('./controller')

router.post('/api/saveToWatch' , saveToWatch)
router.post('/api/users/edit' , editUser)
router.delete('/api/users/:id' , deleteUser)

module.exports = router
