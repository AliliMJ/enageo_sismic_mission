import express from 'express';
import paginate from '../middlewares/pagination';
import {
  getReparationsInterne,
  getReparationsInterneByMaterialCode,
  getLastReparationInterneByMaterialCode,
  getLastReparationInterneByMaterialCode1,
  getAtelierMecanique,
  getReparationInterneById,
  updateDemandeReparationExternedSortie,
  updateDemandeReparationExternedArrive,
  updateDemandeReparationExternedRetour,
  updateDemandeReparationExternedEntree,
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


atelierRouter.put('/updateDemandeReparationExternedSortie/:idRep', updateDemandeReparationExternedSortie);
atelierRouter.put('/updateDemandeReparationdArrive/:idRep', updateDemandeReparationExternedArrive);
atelierRouter.put('/updateDemandeReparationdRetour/:idRep',  updateDemandeReparationExternedRetour);
atelierRouter.put('/updateDemandeReparationdEntree/:idRep', updateDemandeReparationExternedEntree);

atelierRouter.put('/updateReparation/:idRep', updateReparationInterne);
atelierRouter.put('/updateReparationExterne/:idRep', updateReparationExterne);

atelierRouter.put('/EndReparationExterne/:idRep', EndReparationExterne);
