import { Router } from 'express';
import {
  coinsGet,
  coinsPost,
  coinsDelete,
} from '../../controllers/authController';
import { requireAuth } from '../../middleware/authMiddleware';

const router = Router();

router.get('/', requireAuth, coinsGet);
router.post('/', requireAuth, coinsPost);

router.delete('/', requireAuth, coinsDelete);

export default router;
