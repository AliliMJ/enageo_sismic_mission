import express from 'express';
import paginate from '../middlewares/pagination';
import {
  getEmployeById,
  getEmployes,
  getFonctions,
  insertEmploye,
} from '../controllers/employe';
import employeNameFilter from '../middlewares/filter';

export const employeRouter = express.Router();

employeRouter.get('/', employeNameFilter, paginate, getEmployes);
employeRouter.post('/', insertEmploye);
employeRouter.get('/fonctions', getFonctions);

employeRouter.get('/:id', getEmployeById);

// employeRouter.delete('/:id', deleteEmploye);

// employeRouter.put('/:id', updateEmploye);
