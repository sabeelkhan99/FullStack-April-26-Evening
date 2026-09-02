import mongoose from 'mongoose';

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true,
        required: true
    },
    address: String,
    contactNo: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {versionKey: false, timestamps: true});

const Theatre = mongoose.model('Theatre', theatreSchema);

export default Theatre;