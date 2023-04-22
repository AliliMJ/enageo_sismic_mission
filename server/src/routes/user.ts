import express from 'express';
import paginate from '../middlewares/pagination';
import { verifyUserAuthentication, verifyUserAcces } from '../middlewares/auth';
import userEmailFilter from '../middlewares/filter';
import { getUsers, getUserById } from '../controllers/user';
import { Role } from '@prisma/client';

export const userRouter = express.Router();

userRouter.get(
  '/',
  verifyUserAuthentication,
  verifyUserAcces([Role.ADMINISTRATEUR]),
  userEmailFilter,
  paginate,
  getUsers
);

userRouter.post(
  '/',
  verifyUserAuthentication,
  verifyUserAcces([Role.ADMINISTRATEUR]),
  paginate,
  getUsers
);



userRouter.get('/:id', getUserById);
