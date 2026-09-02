import express from 'express';

const router = express.Router();

router.get('/echo', (req, res) => {
    res.send('Echo Received!');
});

export default router;
