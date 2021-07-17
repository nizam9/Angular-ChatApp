import mongoose, { Schema } from 'mongoose';

const schema = mongoose.Schema;

// trim - removes the spaces before and after while saving into DB

var chatSchema = new schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    latestMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
}, {
    timestamps: true
})

var ChatSchema = mongoose.model('Chat', chatSchema);

export default ChatSchema;