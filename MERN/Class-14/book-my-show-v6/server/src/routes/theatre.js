import express from 'express';
import { isLoggedIn, isAdminOrPartnerRole } from '../middlewares/user.js';
import { create, createScreening, findAll, findAvailableMovies, findOne } from '../controller/theatre.js';

const router = express.Router();

router.get('/', isLoggedIn, isAdminOrPartnerRole, findAll);
router.get('/:theatreId/movies', isLoggedIn, isAdminOrPartnerRole, findAvailableMovies);
router.post('/:theatreId/screenings', isLoggedIn, isAdminOrPartnerRole, createScreening);
router.get('/:theatreId', isLoggedIn, isAdminOrPartnerRole, findOne);
router.post('/', isLoggedIn, isAdminOrPartnerRole, create);

export default router;
