import express from 'express';
import paginate from '../middlewares/pagination';

import { enPanneMaterielFilter ,goodMaterielFilter } from '../middlewares/filter';

import {
  getMaterial,
  getMaterialTypes,
  getMaterialByCode,
  mettreEnPanne,
  MettreEnReparation,
  getMaterialByMission,
  getMaterialEnPanneByMission,
  getEnPanneMaterielByDesignation,
  getMaterialGoodByMission,
  getMaterialGoodByDesignation,
  getMaterialEnPanneWithReparations,
  mettreBonEtat,
  getMaterialByDesignation,
  getMaterialByWithoutMission,
  getMaterialByWithoutMissionDesignation,
  ajouterMaterielToMission,
  updateMateriel,
  // MettreEnReparationExterne,
  getMaterielReparationExterne,
  getMaterialWithoutMission,
  deleteMateriel
} from '../controllers/material';

export const materialRouter = express.Router();

materialRouter.get('/', paginate, getMaterial);
materialRouter.get('/materielWithoutMission', paginate, getMaterialByWithoutMission);
materialRouter.get('/EnPanneMateriel/designation/:codeMission',enPanneMaterielFilter,paginate,getEnPanneMaterielByDesignation);
materialRouter.get('/goodMateriel/designation/:codeMission', goodMaterielFilter,paginate, getMaterialGoodByDesignation);
materialRouter.get('/allMateriel/designation/:codeMission', goodMaterielFilter,paginate, getMaterialByDesignation);
materialRouter.get('/allMaterielWithoutMission/designation', goodMaterielFilter,paginate, getMaterialByWithoutMissionDesignation);
materialRouter.put('/ajouterMaterielWithMission/:codeMission', goodMaterielFilter,paginate, ajouterMaterielToMission);

materialRouter.get('/types', getMaterialTypes);

materialRouter.put('/materielWithoutMission',getMaterialWithoutMission);

materialRouter.get('/materielByMission/:codeMission', getMaterialByMission);
materialRouter.get('/materielEnPanneByMission/:codeMission', getMaterialEnPanneByMission);
materialRouter.get('/materielGoodByMission/:codeMission', getMaterialGoodByMission);
materialRouter.get('/materielEnReparationExterne/:codeMission', getMaterielReparationExterne);

materialRouter.get('/getMaterielWithReparations/:codeMat',getMaterialEnPanneWithReparations);

materialRouter.put('/mettreEnReparation/:codeMat',MettreEnReparation);
//materialRouter.put('/mettreEnReparationExterne/:codeMat',MettreEnReparationExterne);
materialRouter.put('/mettreBonEtat/:codeMat', mettreBonEtat);
materialRouter.get('/:codeMat', getMaterialByCode);

materialRouter.post('/mettreEnPanne/:codeMat', mettreEnPanne);

materialRouter.put('/updateMateriel', updateMateriel);

materialRouter.put('/deleteMateriel/:codeMat', deleteMateriel);

