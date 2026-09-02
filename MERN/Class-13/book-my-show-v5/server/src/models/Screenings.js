import mongoose from 'mongoose';

const screensSchema = new mongoose.Schema({
    theatre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theatre',
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        min: 0,
    },
    showTimings: [
        {
            type: String,
            required: true
        }
    ]
}, { timestamps: true });

screensSchema.index({ theatre: 1, movie: 1 }, { unique: true });

const Screening = mongoose.model('Screening', screensSchema);

export default Screening;
