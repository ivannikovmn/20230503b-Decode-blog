const express = require('express')
const router = express.Router();
const {saveToWatch , editUser} = require('./controller')

router.post('/api/saveToWatch' , saveToWatch)
router.post('/api/users/edit' , editUser)

module.exports = router
