import express from 'express';
import paginate from '../middlewares/pagination';

import { usernameFilter } from '../middlewares/filter';
import {
  getUsers,
  getUserById,
  deleteUser,
  updateUserRole,
  updateUser,
  getUserByUsername,
} from '../controllers/compte';

export const userRouter = express.Router();

userRouter.get('/username', usernameFilter, paginate, getUsers);

userRouter.get('/', paginate, getUsers);

//userRouter.post('/', insertUser);

userRouter.get('/:id', getUserById);
userRouter.get('/username/:email', getUserByUsername);

userRouter.delete('/:id', deleteUser);
userRouter.put('/:id', updateUser);

userRouter.put('/:id/role', updateUserRole);
