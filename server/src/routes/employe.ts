import express from 'express';
import paginate from '../middlewares/pagination';
import {
  deleteEmploye,
  getEmployeById,
  getEmployes,
  getFonctions,
  insertEmploye,
  updateEmploye,
  getEmployesNumberOfYear,
  getEmployeByMission,
  deleteEmployeWithRemoveMission,
  getEmployesBymissionByName,
  getEmployesWithOutMission
} from '../controllers/employe';
import { employeNameFilter } from '../middlewares/filter';

export const employeRouter = express.Router();

employeRouter.get('/', employeNameFilter, paginate, getEmployes);
employeRouter.get('/fonctions', getFonctions);
employeRouter.get('/stats', getEmployesNumberOfYear);
employeRouter.get('/employeByMission/:codeMission', getEmployeByMission);
employeRouter.get('/getEmployesBymissionByName/:codeMission',employeNameFilter, paginate, getEmployesBymissionByName);
employeRouter.get('/getEmployesWithoutMissionByName',employeNameFilter, paginate, getEmployesWithOutMission);
employeRouter.put('/deleteEmployeWithMission/:id', deleteEmployeWithRemoveMission);
employeRouter.get('/:id', getEmployeById);

employeRouter.post('/', insertEmploye);

employeRouter.put('/:id', updateEmploye);
employeRouter.delete('/:id', deleteEmploye);
// employeRouter.put('/:id', updateEmploye);
