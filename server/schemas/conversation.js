const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    between: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
    messages: [{
        from: { type: Schema.Types.ObjectId, ref: 'Member' },
        to: { type: Schema.Types.ObjectId, ref: 'Member' },
        content: { type: String, required: true },
        date: { type: Date, required: true },
        saw: { type: Boolean, required: true, default: false }
    }]
});

module.exports = mongoose.model('Conversation', ConversationSchema);