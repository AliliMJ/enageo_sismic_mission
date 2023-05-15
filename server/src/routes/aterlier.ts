import express from 'express';
import paginate from '../middlewares/pagination';
import {
  getReparations,
  getPannes,
  getReparationsByMaterialCode,
  getLastReparationsByMaterialCode,
  getLastReparationsByMaterialCode1,
  getAtelierMecanique
} from '../controllers/atelier';

export const atelierRouter = express.Router();

atelierRouter.get('/reparations', paginate, getReparations);

atelierRouter.get('/pannes', getPannes);
atelierRouter.get('/getAtelier', getAtelierMecanique);

atelierRouter.get('/lastReparation/:codeMat', getLastReparationsByMaterialCode);
atelierRouter.get('/lastReparation1/:codeMat', getLastReparationsByMaterialCode1);
atelierRouter.get('/allReparationsByMateriel/:codeMat', getReparationsByMaterialCode);
