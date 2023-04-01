import express from 'express';
import { registerUser } from './auth.service.ts';
import { authenticate, authorize } from '../middlewares/auth.ts';
import { Role } from '@prisma/client';

export const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

authRouter.post('/login', authenticate, async (req, res) => {
  const user = req.body;

  res.status(201).send(user);
});

authRouter.post(
  '/direction',
  authenticate,
  authorize([Role.DIRECTEUR]),
  async (req, res) => {
    res.status(201).send('User authorized');
  }
);
