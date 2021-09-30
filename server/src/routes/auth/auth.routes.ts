import { Router } from 'express';
const { registerPost, loginPost } = require('../../controllers/authController');

const router = Router();

router.post('/signup', registerPost);
router.post('/login', loginPost);

export default router;
