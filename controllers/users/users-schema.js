import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    type: { type: String, enum: ['STUDENT', 'FACULTY', 'ADMIN'] },
    avatarImage: { 
        type: String, 
        default: 'default-avatar.png',  // 默认头像
        // 可以是任何图片文件名
        validate: {
            validator: function(v) {
                // 允许的图片格式
                return /\.(jpg|jpeg|png|gif)$/i.test(v);
            },
            message: '头像必须是有效的图片格式 (jpg, jpeg, png, gif)'
        }
    }
}, { collection: 'users' });

export default schema; 