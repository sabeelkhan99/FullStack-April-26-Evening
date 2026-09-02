import 'dotenv/config';
import Stripe from 'stripe';

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
export const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

export const stripe = new Stripe(STRIPE_SECRET_KEY);
