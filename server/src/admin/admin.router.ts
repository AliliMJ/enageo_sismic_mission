import express from 'express';

import { authenticate, authorize } from '../middlewares/auth.ts';
import { Role } from '@prisma/client';

export const adminRouter = express.Router();

adminRouter.get(
  '/demands',
  authenticate,
  authorize([Role.ADMINISTRATEUR]),
  (req, res) => {
    res.status(201).send('Access to users demands');
  }
);
