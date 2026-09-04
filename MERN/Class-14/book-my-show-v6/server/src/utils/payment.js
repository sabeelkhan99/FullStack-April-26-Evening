import crypto from 'node:crypto';

export const createTxnId = () => {
    return "TXN" + crypto.randomBytes(7).toString('hex').toUpperCase();
}

export const mapStripeSessionToStatuses = (session) => {
    if (session.status === 'complete' && session.payment_status === 'paid') {
        return { paymentStatus: 'SUCCESS', bookingStatus: 'CONFIRMED' };
    }
    if (session.status === 'expired') {
        return { paymentStatus: 'EXPIRED', bookingStatus: 'EXPIRED' };
    }
    if (session.status === 'complete') {
        return { paymentStatus: 'FAILED', bookingStatus: 'FAILED' };
    }
    return { paymentStatus: 'PENDING', bookingStatus: 'PENDING' };
};