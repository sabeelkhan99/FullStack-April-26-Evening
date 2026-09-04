import express from 'express';
import { isLoggedIn } from '../middlewares/user.js';
import { ApiResponse } from '../core/ApiResponse.js';
import { BadRequestError, ForbiddenError, InternalServerError, NotFoundError } from '../core/ApiError.js';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';
import { CLIENT_URL, STRIPE_PUBLISHABLE_KEY, stripe } from '../config/stripe.js';
import { createTxnId, mapStripeSessionToStatuses } from '../utils/payment.js';
import { validateCreatePaymentRequest } from '../validations/payment.js';
import StripeClient from '../lib/StripeClient.js';

const router = express.Router();

router.post('/payments', isLoggedIn, validateCreatePaymentRequest, async (req, res) => {
    const { userId } = req.user;
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId).populate('movie', 'title');

    const amountInPaise = Math.round(Number(booking.amount) * 100);
    if (!Number.isFinite(amountInPaise) || amountInPaise <= 0) {
        throw new BadRequestError('Invalid booking amount');
    }

    const session = await StripeClient.createPayment(booking, amountInPaise, userId);
    
    const existingPayment = await Payment.findOne({ bookingId: String(booking._id), status: 'SUCCESS' });
    if (existingPayment) {
        throw new BadRequestError('Payment against this booking id is already done');
    }

    await Payment.create({
        txnId: createTxnId(),
        userId: String(userId),
        amount: Number(booking.amount),
        method: 'card',
        bookingId: String(booking._id),
        status: 'PENDING',
        sessionId: session.id,
    });

    res.json(ApiResponse.build('success', 'created a pending payment', {
        sessionId: session.id,
        url: session.url,
        publishableKey: STRIPE_PUBLISHABLE_KEY,
        bookingId: booking._id,
    }));
});

router.get('/status', isLoggedIn, async (req, res) => {
    const { userId } = req.user;
    const sessionId = req.query.session_id;

    if (!sessionId) {
        throw new BadRequestError('session_id is required');
    }

    const payment = await Payment.findOne({ sessionId });
    if (!payment) {
        throw new NotFoundError('Payment not found');
    }

    if (String(payment.userId) !== String(userId)) {
        throw new ForbiddenError('You cannot view this payment');
    }

    const stripePaymentStatusResp = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent'],
    });

    const { paymentStatus, bookingStatus } = mapStripeSessionToStatuses(stripePaymentStatusResp);

    const booking = await Booking.findById(payment.bookingId);
    if (!booking) {
        throw new InternalServerError('Booking Id do not exists');
    }

    booking.status = bookingStatus;
    payment.status = paymentStatus;

    await booking.save();
    await payment.save();

    res.json(ApiResponse.build('success', 'payment status', {
        paymentStatus,
        bookingStatus,
        stripeStatus: stripePaymentStatusResp.status,
        stripePaymentStatus: stripePaymentStatusResp.payment_status,
        sessionId: stripePaymentStatusResp.id,
        bookingId: payment.bookingId,
        amount: payment.amount,
    }));
});

export default router;
