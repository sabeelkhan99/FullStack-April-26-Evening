import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    passwordHash: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER', 'PARTNER'],
        default: 'USER'
    }
}, { versionKey: false, timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;