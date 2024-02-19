// models/Session.js

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Zennith:cVPt5FkBXKt9FXA6@utvt.fuicefd.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const sessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true }
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
