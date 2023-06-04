import express from 'express';
import paginate from '../middlewares/pagination';
import {
  getReparations,
  getReparationsByMaterialCode,
  getLastReparationsByMaterialCode,
  getLastReparationByMaterialCode,
  getAtelierMecanique,
  getReparationsById,
  // updateDemandeReparationdSortie,
  // updateDemandeReparationdArrive,
  // updateDemandeReparationdRetour,
  // updateDemandeReparationdEntree,
  // getLastReparationByMaterialCodeWithDemande,
  // EndReparationExterne,
  updateReparation
} from '../controllers/atelier';

export const atelierRouter = express.Router();

atelierRouter.get('/reparations', paginate, getReparations);

atelierRouter.get('/getAtelier', getAtelierMecanique);
atelierRouter.get('/getReparationsById/:idRep',getReparationsById);

atelierRouter.get('/lastReparation/:codeMat', getLastReparationsByMaterialCode);
atelierRouter.get('/lastReparation1/:codeMat', getLastReparationByMaterialCode);
atelierRouter.get('/lastReparation1/:codeMat', getLastReparationByMaterialCode);
// atelierRouter.get('/getLastReparationByMaterialCodeWithDemande/:codeMat', getLastReparationByMaterialCodeWithDemande);

// atelierRouter.put('/updateDemandeReparationdSortie/:idRep', updateDemandeReparationdSortie);
// atelierRouter.put('/updateDemandeReparationdArrive/:idRep', updateDemandeReparationdArrive);
// atelierRouter.put('/updateDemandeReparationdRetour/:idRep',  updateDemandeReparationdRetour);
// atelierRouter.put('/updateDemandeReparationdEntree/:idRep', updateDemandeReparationdEntree);

atelierRouter.put('/updateReparation/:idRep', updateReparation);

// atelierRouter.put('/EndReparationExterne/:idRep', EndReparationExterne);
