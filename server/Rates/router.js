const express = require('express')
const router = express.Router();
const {saveRate , editRate} = require('./controller.js');

router.post('/api/rate/new' , saveRate)
router.post('/api/rate/edit' , editRate)

module.exports = router
