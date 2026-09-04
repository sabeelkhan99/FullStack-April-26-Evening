import { stripe, CLIENT_URL } from "../config/stripe.js";

class StripeClient {
    static async createPayment(booking, amountInPaise, userId) {
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

        return session;
    }
}

export default StripeClient;