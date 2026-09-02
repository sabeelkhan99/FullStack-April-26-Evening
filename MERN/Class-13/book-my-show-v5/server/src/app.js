import express from 'express';
import { ApiError} from './core/ApiError.js';
import { ApiResponse } from './core/ApiResponse.js';
import cors from 'cors';
import userRoutes from './routes/user.js';
import movieRoutes from './routes/movies.js';
import healthcheckRoutes from './routes/healthcheck.js';
import theatreRoutes from './routes/theatre.js';
import bookingRoutes from './routes/booking.js';
import paymentRoutes from './routes/payment.js';

const app = express()

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET','POST','DELETE','PATCH']
}));

// Register routes
app.use(healthcheckRoutes);
app.use("/users", userRoutes);
app.use("/movies", movieRoutes);
app.use("/theatre", theatreRoutes);
app.use("/theatres", theatreRoutes);
app.use("/bookings", bookingRoutes);
app.use(paymentRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof ApiError) {
        const { message = 'Something went wrong!', status = 500 } = err;
        return res.status(status).json(ApiResponse.build('failed', message))
    }
    return res.status(500).json(ApiResponse.build('failed', 'Best minds working on it!'));
});

export default app;
