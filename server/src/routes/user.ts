import express from 'express';
import paginate from '../middlewares/pagination';
import { verifyUserAuthentication, verifyUserAcces } from '../middlewares/auth';

import { getUsers, getUserById } from '../controllers/user';
import { Role } from '@prisma/client';

export const userRouter = express.Router();

userRouter.post(
  '/users',
  verifyUserAuthentication,
  verifyUserAcces([Role.ADMINISTRATEUR]),
  paginate,
  getUsers
);

userRouter.get('/users/:id', getUserById);
