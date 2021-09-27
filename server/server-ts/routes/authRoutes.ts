import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
const { registerPost, loginPost, coinsGet, coinsPost } = require('../controllers/authController');

const router = Router();

router.post('/signup', registerPost);
router.post('/login', loginPost);

router.get('/coins', requireAuth, coinsGet);
router.post('/coins', requireAuth, coinsPost);

module.exports = { router };