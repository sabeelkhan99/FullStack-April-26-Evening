import mongoose from 'mongoose';
import Theatre from '../models/Theatre.js';
import Movie from '../models/Movie.js';
import Screening from '../models/Screenings.js';
import { ApiResponse } from '../core/ApiResponse.js';
import { BadRequestError, NotFoundError } from '../core/ApiError.js';
import Logger from '../core/Logger.js';

export const findAll = async (req, res) => {
    const { userId } = req.user;
    Logger.info(`Request received to get theatres for user - ${userId}`);

    const theatres = await Theatre.find({ author: userId }).sort({ createdAt: -1 });
    res.json(ApiResponse.build('success', 'All theatres', theatres));
};

export const findOne = async (req, res) => {
    const { theatreId } = req.params;
    const { userId } = req.user;
    Logger.info(`Request received to get theatre ${theatreId} for user - ${userId}`);

    const theatre = await Theatre.findOne({ _id: theatreId, author: userId });

    if (!theatre) {
        throw new NotFoundError('Theatre not found');
    }

    res.json(ApiResponse.build('success', 'Theatre details', theatre));
};

export const create = async (req, res) => {
    const { userId } = req.user;
    const { name, address, contactNo } = req.body;
    Logger.info(`Request received to create theatre for user - ${userId}`);

    const theatre = await Theatre.create({ name, address, contactNo, author: userId });
    res.status(201).json(ApiResponse.build('success', 'Theatre created successfully', theatre));
};

const findOwnedTheatre = async (theatreId, userId) => {
    if (!mongoose.isValidObjectId(theatreId)) {
        throw new NotFoundError('Theatre not found');
    }

    const theatre = await Theatre.findOne({ _id: theatreId, author: userId });
    if (!theatre) {
        throw new NotFoundError('Theatre not found');
    }

    return theatre;
};

export const findAvailableMovies = async (req, res) => {
    const { theatreId } = req.params;
    const { userId } = req.user;

    // This simply checks if current logged in user owns the theatre
    await findOwnedTheatre(theatreId, userId);

    const existingScreenings = await Screening.find({ theatre: theatreId }).select('movie');
    const screenedMovieIds = existingScreenings.map((screening) => screening.movie);
    const movies = await Movie.find({ _id: { $nin: screenedMovieIds } }).sort({ title: 1 });

    res.json(ApiResponse.build('success', 'Movies available for screening', movies));
};

export const createScreening = async (req, res) => {
    const { theatreId } = req.params;
    const { movieId, showTimings, price } = req.body;
    const { userId } = req.user;
    await findOwnedTheatre(theatreId, userId);

    if (!mongoose.isValidObjectId(movieId)) {
        throw new NotFoundError('Movie not found');
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
        throw new NotFoundError('Movie not found');
    }

    if (!Array.isArray(showTimings) || showTimings.length === 0 || showTimings.some((time) => typeof time !== 'string' || !/^(0[1-9]|1[0-2]):[0-5]\d\s(?:AM|PM)$/.test(time))) {
        throw new BadRequestError('Provide at least one valid screening time in HH:mm AM/PM format');
    }

    const screeningPrice = Number(price);
    if (price === '' || price === null || price === undefined || !Number.isFinite(screeningPrice) || screeningPrice < 0) {
        throw new BadRequestError('Provide a valid non-negative screening price');
    }

    const alreadyScreening = await Screening.exists({ theatre: theatreId, movie: movieId });
    if (alreadyScreening) {
        throw new BadRequestError('This movie already has a screening at this theatre');
    }

    const screening = await Screening.create({ theatre: theatreId, movie: movieId, author: userId, showTimings, price: screeningPrice });
    res.status(201).json(ApiResponse.build('success', 'Screening added successfully', screening));
};
