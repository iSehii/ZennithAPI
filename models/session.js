// models/Session.js
const { Schema, model } = require('mongoose');

const sessionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true }
});

const Session = model('Session', sessionSchema);

module.exports = Session;
