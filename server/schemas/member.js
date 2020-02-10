const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    socketId: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    online: { type: Boolean, required: true, default: false },
    lastLogin: { type: Date, required: true, default: new Date() },
    image: { type: String },
    conversion: [{ type: Schema.Types.ObjectId, ref: 'Conversion' }]
});

module.exports = mongoose.model('Member', MemberSchema);