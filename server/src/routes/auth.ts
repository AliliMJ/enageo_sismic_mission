import express from 'express';
import { registerUser, loginUser , verifyPassword} from '../controllers/auth.ts';

export const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/verifyPassword', verifyPassword);
authRouter.post('/login', loginUser);
