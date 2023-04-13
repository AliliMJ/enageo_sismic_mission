import express from 'express';
import paginate from '../middlewares/pagination';
import {
  getReparations,
  getPannes,
  getReparationsByMaterialCode,
} from '../controllers/atelier';

export const atelierRouter = express.Router();

atelierRouter.get('/reparations', paginate, getReparations);

atelierRouter.get('/pannes', getPannes);

atelierRouter.get('/reparation/:code', getReparationsByMaterialCode);
