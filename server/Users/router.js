const express = require('express')
const router = express.Router();
const {editUser} = require('./controller')

router.post('/api/users/edit' , editUser)

module.exports = router
