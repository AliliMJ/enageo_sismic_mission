import express from 'express';
import paginate from '../middlewares/pagination';
import {
  getReparationsInterne,
  getReparationsInterneByMaterialCode,
  getLastReparationInterneByMaterialCode,
  getLastReparationInterneByMaterialCode1,
  getAtelierMecanique,
  getReparationInterneById,
  updateReparationExternedSortie,
  updateReparationExternedArrive,
  updateReparationExternedRetour,
  updateReparationExternedEntree,
  // getLastReparationByMaterialCodeWithDemande,
  EndReparationExterne,
  updateReparationInterne,
  getLastReparationExterneByMaterialCode,
  updateReparationExterne,
  getReparationsExterneByMaterialCode
} from '../controllers/atelier';

export const atelierRouter = express.Router();

atelierRouter.get('/reparationsInterne', paginate, getReparationsInterne);

atelierRouter.get('/getAtelier', getAtelierMecanique);
atelierRouter.get('/getReparationsById/:idRep', getReparationInterneById);

atelierRouter.get('/lastReparationInterne/:codeMat', getLastReparationInterneByMaterialCode);
atelierRouter.get('/lastReparationExterne/:codeMat', getLastReparationExterneByMaterialCode);
atelierRouter.get('/lastReparation1/:codeMat', getLastReparationInterneByMaterialCode1);
// atelierRouter.get('/getLastReparationByMaterialCodeWithDemande/:codeMat', getLastReparationByMaterialCodeWithDemande);


atelierRouter.put('/updateReparationExternedSortie/:idRep', updateReparationExternedSortie);
atelierRouter.put('/updateReparationExternedArrive/:idRep', updateReparationExternedArrive);
atelierRouter.put('/updateReparationExternedRetour/:idRep',  updateReparationExternedRetour);
atelierRouter.put('/updateReparationExternedEntree/:idRep', updateReparationExternedEntree);

atelierRouter.put('/updateReparation/:idRep', updateReparationInterne);
atelierRouter.put('/updateReparationExterne/:idRep', updateReparationExterne);

atelierRouter.put('/EndReparationExterne/:idRep', EndReparationExterne);
