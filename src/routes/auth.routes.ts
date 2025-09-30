import { Router } from 'express';
import { getProfile, login, register } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { loginSchema, registerSchema, validate } from '../middleware/validate.middleware';

const authRouter = Router();

authRouter.post('/register', validate(registerSchema), register);
authRouter.post('/login', validate(loginSchema), login);
authRouter.get('/profile', authenticateToken, getProfile);

export { authRouter };
