import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    txnId: {
        type: String,
        unique: true,
        required: true
        // e.g - "TXN23473783"
    },
    userId: String,
    amount: {
        type: Number,
        min: 0
    },
    method: {
        type: String
    },
    bookingId: String,
    status: {
        type: String,
        enum: ['PENDING', 'SUCCESS', 'FAILED', 'CANCELLED', 'EXPIRED'],
        default: 'PENDING'
    },
    sessionId: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;