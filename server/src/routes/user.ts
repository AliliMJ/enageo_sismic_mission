import express from 'express';
import paginate from '../middlewares/pagination';
import { getUsers, getUserById } from '../controllers/user';

export const userRouter = express.Router();

userRouter.get('/users', paginate, getUsers);

userRouter.get('/users/:id', getUserById);
