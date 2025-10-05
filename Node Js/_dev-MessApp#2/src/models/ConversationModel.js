const mongosee = require('mongoose');
const Schema = mongosee.Schema;

const conversationSchema = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    lastMessage: {
        text: String,
        sender: { type: Schema.Types.ObjectId, ref: 'User' }
    },

}, { timestamps: true });

const conversation = mongosee.model('Conversation', conversationSchema);
module.exports = conversation;