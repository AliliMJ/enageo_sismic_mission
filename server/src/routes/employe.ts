import express from 'express';
import paginate from '../middlewares/pagination';
import {
  deleteEmploye,
  getEmployeById,
  getEmployes,
  getFonctions,
  insertEmploye,
  updateEmploye,
} from '../controllers/employe';
import { employeNameFilter } from '../middlewares/filter';

export const employeRouter = express.Router();

employeRouter.get('/', employeNameFilter, paginate, getEmployes);
employeRouter.post('/', insertEmploye);
employeRouter.get('/fonctions', getFonctions);
employeRouter.get('/:id', getEmployeById);
employeRouter.put('/:id', updateEmploye);
employeRouter.delete('/:id', deleteEmploye);

// employeRouter.delete('/:id', deleteEmploye);

// employeRouter.put('/:id', updateEmploye);
