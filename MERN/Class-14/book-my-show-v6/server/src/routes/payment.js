import express from 'express';
import { isLoggedIn } from '../middlewares/user.js';
import { ApiResponse } from '../core/ApiResponse.js';
import { BadRequestError, ForbiddenError, InternalServerError, NotFoundError } from '../core/ApiError.js';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';
import { CLIENT_URL, STRIPE_PUBLISHABLE_KEY, stripe } from '../config/stripe.js';
import { createTxnId } from '../utils/payment.js';

const router = express.Router();

const mapStripeSessionToStatuses = (session) => {
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

router.post('/payments', isLoggedIn, async (req, res) => {
    const { userId } = req.user;
    const { bookingId } = req.body;

    if (!bookingId) {
        throw new BadRequestError('bookingId is required');
    }

    const booking = await Booking.findById(bookingId).populate('movie', 'title');
    if (!booking) {
        throw new NotFoundError('Booking not found');
    }

    if (String(booking.user) !== String(userId)) {
        throw new ForbiddenError('You cannot pay for this booking');
    }

    if (booking.status === 'CONFIRMED') {
        throw new BadRequestError('This booking is already paid');
    }

    if (booking.status !== 'PENDING') {
        throw new BadRequestError('This booking cannot be paid');
    }

    const amountInPaise = Math.round(Number(booking.amount) * 100);
    if (!Number.isFinite(amountInPaise) || amountInPaise <= 0) {
        throw new BadRequestError('Invalid booking amount');
    }


    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
            {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: booking.movie?.title
                            ? `${booking.movie.title} tickets`
                            : 'Movie tickets',
                        description: `Seats: ${booking.seats.join(', ')} · ${booking.showTime || ''}`.trim(),
                    },
                    unit_amount: amountInPaise,
                },
                quantity: 1,
            },
        ],
        success_url: `${CLIENT_URL}/status?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${CLIENT_URL}/status?session_id={CHECKOUT_SESSION_ID}`,
        metadata: {
            bookingId: String(booking._id),
            userId: String(userId),
        },
    });

    const existingPayment = await Payment.findOne({ bookingId: String(booking._id), status: 'SUCCESS' });

    if (existingPayment) {
        throw new BadRequestError('Payment against this booking id is already done');
    }

    await Payment.create({
        txnId: createTxnId(),
        userId: String(userId),
        amount: Number(booking.amount),
        method: 'STRIPE',
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

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent'],
    });

    const { paymentStatus, bookingStatus } = mapStripeSessionToStatuses(session);

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
        stripeStatus: session.status,
        stripePaymentStatus: session.payment_status,
        sessionId: session.id,
        bookingId: payment.bookingId,
        amount: payment.amount,
    }));
});

export default router;
