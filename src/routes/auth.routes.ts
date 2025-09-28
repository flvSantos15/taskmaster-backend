import { Router } from 'express';
import { getProfile, login, register } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { loginSchema, registerSchema, validate } from '../middleware/validate.middleware';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/profile', authenticateToken, getProfile);

export default router;