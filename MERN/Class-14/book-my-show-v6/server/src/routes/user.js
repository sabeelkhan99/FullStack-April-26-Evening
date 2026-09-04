import express from 'express';
import { AuthenticationError, BadRequestError, InternalServerError, NotFoundError } from '../core/ApiError.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ApiResponse } from '../core/ApiResponse.js';
import { isLoggedIn } from '../middlewares/user.js';

const router = express.Router();

const JWT_TOKEN = 'weneedabettertoken';

// Signup route
router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;
    // check if user already exist with this email
    const user = await User.findOne({ email });
    if (user) {
        throw new BadRequestError('User with this email already exists');
    }
    const hash = await bcrypt.hash(password, 12);
    const newUser = await User.create({ email, passwordHash: hash, role });
    res.json(ApiResponse.build('success', 'User created successfully', { email: newUser.email }));
});

// Login Route
router.post('/login', async(req, res) => {
    const { email, password } = req.body;
    // check if user with the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
        throw new AuthenticationError('Invalid email or password');
    }

    // verify the incoming password
    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
        throw new AuthenticationError('Invalid email or password');
    }

    // we sign the token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_TOKEN, { expiresIn: '2d' });
    res.json(ApiResponse.build('success', 'Logged In Successfully', { token: token }));
});

router.get('/profile', isLoggedIn, async(req, res) => {
    const { userId } = req.user;
    const user = await User.findById(userId).select('-passwordHash');
    if (!user) {
        throw new NotFoundError('User do not exist!');
    }
    res.json(ApiResponse.build('success', 'User profile', user));
});

export default router;