import express from 'express';
import paginate from '../middlewares/pagination';

import { enPanneMaterielFilter ,goodMaterielFilter } from '../middlewares/filter';

import {
  getMaterial,
  getMaterialTypes,
  getMaterialByCode,
  mettreEnPanne,
  demandeReparation,
  MettreEnReparation,
  getMaterialByproject,
  getMaterialEnPanneByproject,
  getEnPanneMaterielByDesignation,
  getMaterialGoodByproject,
  getMaterialGoodByDesignation,
  getMaterialEnPanneWithReparations,
} from '../controllers/material';

export const materialRouter = express.Router();

materialRouter.get('/', paginate, getMaterial);
materialRouter.get('/EnPanneMateriel/designation/:idProjet',enPanneMaterielFilter,paginate,getEnPanneMaterielByDesignation);
materialRouter.get('/goodMateriel/designation/:idProjet', goodMaterielFilter,paginate, getMaterialGoodByDesignation);

materialRouter.get('/types', getMaterialTypes);

materialRouter.get('/materielByProject/:idProjet', getMaterialByproject);
materialRouter.get('/materielEnPanneByProject/:idProjet', getMaterialEnPanneByproject);
materialRouter.get('/materielGoodByProject/:idProjet',  getMaterialGoodByproject);

materialRouter.get('/getMaterielWithReparations/:codeMat',getMaterialEnPanneWithReparations);

materialRouter.post('/mattreEnReparation/:codeMat',MettreEnReparation);
materialRouter.get('/:codeMat', getMaterialByCode);

materialRouter.post('/mettreEnPanne/:codeMat', mettreEnPanne);

materialRouter.post('/:codeMat/demanderReparation', demandeReparation);
