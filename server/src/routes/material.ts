import express from 'express';
import paginate from '../middlewares/pagination';

import { enPanneMaterielFilter ,goodMaterielFilter } from '../middlewares/filter';

import {
  getMaterial,
  getMaterialTypes,
  getMaterialByCode,
  mettreEnPanne,
  MettreEnReparation,
  getMaterialByproject,
  getMaterialEnPanneByproject,
  getEnPanneMaterielByDesignation,
  getMaterialGoodByproject,
  getMaterialGoodByDesignation,
  getMaterialEnPanneWithReparations,
  mettreBonEtat,
  getMaterialByDesignation,
  getMaterialByWithoutProjet,
  getMaterialByWithoutProjetDesignation,
  ajouterMaterielToProjet
} from '../controllers/material';

export const materialRouter = express.Router();

materialRouter.get('/', paginate, getMaterial);
materialRouter.get('/materielWithoutProjet', paginate, getMaterialByWithoutProjet);
materialRouter.get('/EnPanneMateriel/designation/:idProjet',enPanneMaterielFilter,paginate,getEnPanneMaterielByDesignation);
materialRouter.get('/goodMateriel/designation/:idProjet', goodMaterielFilter,paginate, getMaterialGoodByDesignation);
materialRouter.get('/allMateriel/designation/:idProjet', goodMaterielFilter,paginate, getMaterialByDesignation);
materialRouter.get('/allMaterielWithoutProjet/designation/:idProjet', goodMaterielFilter,paginate, getMaterialByWithoutProjetDesignation);
materialRouter.put('/ajouterMaterielWithProject/:idProjet', goodMaterielFilter,paginate, ajouterMaterielToProjet);

materialRouter.get('/types', getMaterialTypes);

materialRouter.get('/materielByProject/:idProjet', getMaterialByproject);
materialRouter.get('/materielEnPanneByProject/:idProjet', getMaterialEnPanneByproject);
materialRouter.get('/materielGoodByProject/:idProjet',  getMaterialGoodByproject);

materialRouter.get('/getMaterielWithReparations/:codeMat',getMaterialEnPanneWithReparations);

materialRouter.put('/mettreEnReparation/:codeMat',MettreEnReparation);
materialRouter.put('/mettreBonEtat/:codeMat', mettreBonEtat);
materialRouter.get('/:codeMat', getMaterialByCode);

materialRouter.post('/mettreEnPanne/:codeMat', mettreEnPanne);

