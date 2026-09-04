import express from 'express';
import { findAll, findOne, findScreeningTheatres } from '../controller/movie.js';
const router = express.Router();

router.get('/', findAll);
router.get('/:id/theatres', findScreeningTheatres);
router.get('/:id', findOne);

export default router;
