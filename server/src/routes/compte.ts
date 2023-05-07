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
  insertUser,
  getUsersNumber,
  getUsersNumberOfYear
} from '../controllers/compte';

export const userRouter = express.Router();

userRouter.get('/username', usernameFilter, paginate, getUsers);

userRouter.get('/', paginate, getUsers);

userRouter.get('/stats',getUsersNumber);
userRouter.get('/dates',getUsersNumberOfYear);

userRouter.post('/', insertUser);

userRouter.get('/:id', getUserById);
userRouter.get('/username/:username', getUserByUsername);

userRouter.delete('/:id', deleteUser);
userRouter.put('/:id', updateUser);

userRouter.put('/:id/role', updateUserRole);
