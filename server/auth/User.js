const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email : String,
    full_name : String,
    password: String,
    isAdmin: Boolean,
    googleId: String,
})

module.exports = mongoose.model('user' , UserSchema)