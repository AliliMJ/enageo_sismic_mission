import express from 'express';
import paginate from '../middlewares/pagination';

import { enPanneMaterielFilter ,goodMaterielFilter , MaterielFilter } from '../middlewares/filter';

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
  getMaterialWithReparations,
  mettreBonEtat,
  getMaterialByDesignation,
  getMaterialByWithoutMission,
  getMaterialByWithoutMissionDesignation,
  ajouterMaterielToMission,
  updateMateriel,
  MettreEnReparationExterne,
  getMaterielReparationExterne,
  getMaterialWithoutMission,
  deleteMateriel,
  mettreEnPanneExterne,
  getMaterialDesignation,
  insertMaterial,
  deleteMaterielFromDB
} from '../controllers/material';

export const materialRouter = express.Router();

materialRouter.get('/', MaterielFilter , getMaterial);
materialRouter.get('/designation', MaterielFilter , paginate, getMaterialDesignation);
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

materialRouter.get('/getMaterielWithReparations/:codeMat',getMaterialWithReparations);

materialRouter.put('/mettreEnReparation/:codeMat',MettreEnReparation);
materialRouter.put('/mettreEnReparationExterne/:codeMat',MettreEnReparationExterne);
materialRouter.put('/mettreBonEtat/:codeMat', mettreBonEtat);
materialRouter.get('/:codeMat', getMaterialByCode);

materialRouter.post('/mettreEnPanne/:codeMat', mettreEnPanne);
materialRouter.post('/mettreEnPanneExterne/:codeMat', mettreEnPanneExterne);

materialRouter.put('/updateMateriel/:codeMat', updateMateriel);
materialRouter.put('/insert', insertMaterial);
materialRouter.put('/deleteMateriel/:codeMat', deleteMateriel);

materialRouter.delete('/deleteMaterielFromDB/:codeMat', deleteMaterielFromDB);

