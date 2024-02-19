// models/User.js

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Zennith:cVPt5FkBXKt9FXA6@utvt.fuicefd.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
