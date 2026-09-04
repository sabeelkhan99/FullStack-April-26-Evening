import Booking from "../models/Booking.js";

export const validateCreatePaymentRequest = async(req, res, next) => {
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

    next();
}