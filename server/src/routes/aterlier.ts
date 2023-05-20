import express from 'express';
import paginate from '../middlewares/pagination';
import {
  getReparations,
  getReparationsByMaterialCode,
  getLastReparationsByMaterialCode,
  getLastReparationsByMaterialCode1,
  getAtelierMecanique,
  getReparationsById
} from '../controllers/atelier';

export const atelierRouter = express.Router();

atelierRouter.get('/reparations', paginate, getReparations);

atelierRouter.get('/getAtelier', getAtelierMecanique);
atelierRouter.get('/getReparationsById/:idRep',getReparationsById);

atelierRouter.get('/lastReparation/:codeMat', getLastReparationsByMaterialCode);
atelierRouter.get('/lastReparation1/:codeMat', getLastReparationsByMaterialCode1);
atelierRouter.get('/allReparationsByMateriel/:codeMat', getReparationsByMaterialCode);
