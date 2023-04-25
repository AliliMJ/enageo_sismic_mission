import express from 'express';
import paginate from '../middlewares/pagination';

import { userEmailFilter } from '../middlewares/filter';
import {
  getUsers,
  getUserById,
  deleteUser,
  updateUserRole,
  insertUser
} from '../controllers/user';

export const userRouter = express.Router();

userRouter.get('/email', userEmailFilter, paginate, getUsers);

userRouter.get('/', paginate, getUsers);

userRouter.post('/', insertUser);

userRouter.get('/:id', getUserById);

userRouter.delete('/:id', deleteUser);
userRouter.put('/:id/role', updateUserRole);
