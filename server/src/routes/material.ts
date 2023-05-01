import express from 'express';
import paginate from '../middlewares/pagination';
import {
  getMaterial,
  getMaterialTypes,
  getMaterialByCode,
  mettreEnPanne,
  demandeReparation,
  reparer,
} from '../controllers/material';

export const materialRouter = express.Router();

materialRouter.get('/', paginate, getMaterial);

materialRouter.get('/types', getMaterialTypes);

materialRouter.get('/:codeMat', getMaterialByCode);

materialRouter.post('/:codeMat/mettreEnPanne', mettreEnPanne);
materialRouter.post('/:codeMat/reparer', reparer);
materialRouter.post('/:codeMat/demanderReparation', demandeReparation);
