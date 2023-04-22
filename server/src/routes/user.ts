import express from 'express';
import paginate from '../middlewares/pagination';
import { verifyUserAuthentication, verifyUserAcces } from '../middlewares/auth';
import { userEmailFilter } from '../middlewares/filter';
import { getUsers, getUserById ,insertUser } from '../controllers/user';
import { Role } from '@prisma/client';

export const userRouter = express.Router();

userRouter.get('/email', userEmailFilter, paginate, getUsers);

userRouter.get('/', paginate, getUsers);

userRouter.post('/insert',insertUser);

userRouter.get('/:id', getUserById);
