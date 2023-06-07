const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    email : String,
    full_name : String,
    password: String,
    isAdmin: Boolean,
    toWatch: [{type: Schema.Types.ObjectId , ref: 'blog'}],
    watched: [{type: Schema.Types.ObjectId , ref: 'blog'}],
    googleId: String,
    gitHubId: String,

})

module.exports = mongoose.model('user' , UserSchema)