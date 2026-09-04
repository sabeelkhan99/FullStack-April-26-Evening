import jwt from 'jsonwebtoken';
import { ApiResponse } from '../core/ApiResponse.js';
import { InternalServerError, ForbiddenError } from '../core/ApiError.js';

const JWT_TOKEN = 'weneedabettertoken';

export const isLoggedIn = (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', "");
        const {userId, role} = jwt.verify(token, JWT_TOKEN);
        req.user = {userId, role};
        return next();
    }
    catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.json(ApiResponse.build('failed', 'Please login again to continue'))
        }
        next(new InternalServerError('Something went wrong while validating token'));
    }
}

export const isAdminOrPartnerRole = (req, res, next) => {
    const { userId, role } = req.user;
    if (!(role === 'ADMIN' || role === 'PARTNER')) {
        return next(new ForbiddenError('You do not have permission to create theatre'));
    }
    next();
}