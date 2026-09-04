import crypto from 'node:crypto';

export const createTxnId = () => {
    return crypto.randomBytes(7).toString('hex').toUpperCase();
}