import express from 'express';
import { isLoggedIn } from '../middlewares/user.js';
import Screening from '../models/Screenings.js';
import { ApiResponse } from '../core/ApiResponse.js';
import { BadRequestError, NotFoundError } from '../core/ApiError.js';
import Booking from '../models/Booking.js';

const router = express.Router();

router.post('/', isLoggedIn, async(req, res) => {
    const { userId } = req.user;
    const { theatre, movie, seats, showTime, amount, screening } = req.body;
    
    // const foundScreening = await Screening.findOne({ theatre, movie, showTimings: { $in: [showTime] } });
    const foundScreening = await Screening.findById(screening);
    
    if (!foundScreening) {
        throw new NotFoundError('Something went wrong please. Try booking again');
    }
    
    // Amount check - This should also have proper rounding off mechanism to avoid 
    // unexpected issue with the amount comparison.
    if (amount !== foundScreening.price * seats.length) {
        throw new BadRequestError('Invalid Amount');
    }

    // check if seats are already bookied for this movie and theatre
    const isBookingExists = await Booking.exists({
        theatre,
        movie,
        screening,
        seats: { $in: [...seats] }
    });

    if (isBookingExists) {
        throw new BadRequestError('Some of the seats are already booked');
    }


    const booking = await Booking.create({
        theatre,
        movie,
        user: userId,
        showTime,
        amount,
        seats,
        screening
    });

    res.json(ApiResponse.build('success', 'created a pending booking', booking));
})

export default router;