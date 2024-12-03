import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    topic: String,
    userName: String,
    verified: Boolean,
    time: { type: String, default: 'now' },
    title: String,
    logo: String,
    handle: String,
    tuit: String,
    image: { type: String, default: 'nasa.png' }, // 添加默认头像
    liked: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
    disliked: { type: Boolean, default: false },
    dislikes: { type: Number, default: 0 },
    replies: { type: Number, default: 0 },
    retuits: { type: Number, default: 0 },
    attachments: {
        image: String,
        gif: String,
        location: {
            type: { type: String },
            coordinates: [Number]
        },
        emoji: String
    }
}, { collection: 'tuits' });

schema.index({ "attachments.location": "2dsphere" });
export default schema;